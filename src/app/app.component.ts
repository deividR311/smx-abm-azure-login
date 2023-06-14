import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { TranslateService } from '@ngx-translate/core';
import { NgxRolesService } from 'ngx-permissions';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthMsalService } from './core/authentication/auth-msal.service';
import { RolesService } from './core/services/roles.service';
import Swal from 'sweetalert2';
import { LoadingService } from './core/services/loading.service';
import jwt_decode from 'jwt-decode';
import { UserAdminService } from './modules/support/services/user-admin.services';
import { MessagesService } from './core/services/messages.service';
import { MessagesResponse } from './core/resources/resources.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'linea-base';
  isIframe = false;
  loginDisplay = false;
  loadHeader = false;
  public loading = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    readonly translate: TranslateService,
    readonly authMsalService: AuthMsalService,
    readonly rolesService: RolesService,
    public dialog: MatDialog,
    private ngRolesService: NgxRolesService,
    readonly userAdminService: UserAdminService,
    private _router: Router,
    readonly loadingService: LoadingService,
    readonly messagesService: MessagesService,
  ) {
    this.translate.setDefaultLang('es');
    const isSupport = sessionStorage.getItem('rolname');
    if (isSupport) {
      const tokenUserCreate = (window.location.href.split("#")[1] || "").split("=")[1] || "";
      if (String(tokenUserCreate) === String('access_denied&error_description')) {
        this._router.navigate(["/support"]);
      } else if (tokenUserCreate !== '') {
        const dataUserCreate = jwt_decode(tokenUserCreate);
        this._router.navigate(["/support"], { state: { dataUserCreate: dataUserCreate } });
      }
    }
  }

  ngOnInit() {
    this.getDatUser();
    this.authService.instance.enableAccountStorageEvents();
    this.roles();
  }

  getDatUser() {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        if (this.authService.instance.getActiveAccount()?.idTokenClaims === undefined || this.authService.instance.getActiveAccount()?.idTokenClaims === null) {
          setTimeout(() => {
            location.reload();
          }, 3000);
        }

      });
  }

  async roles(): Promise<void> {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        }
      });
    let dataPermissions = sessionStorage.getItem('permissions');
    if (dataPermissions) {
      this.loadHeader = true;
      this.isIframe = window !== window.parent && !window.opener;
      let objectData = JSON.parse(dataPermissions);
      for (let key of Object.keys(objectData)) {
        this.ngRolesService.addRoleWithPermissions(key, objectData[key]);
      }
    }
    else {
      this.loading = true;
      let result = await this.suscribeMsal();
      if (result) {
        if (result.length === 0) {
          this.loading = false;
          // aqui se consume el servicio de agregar usuario exmax
          this.registrerUser();
          this.logout();
          return;
        }
        else {
          this.loading = true;
          let permissions = await this.getDataPermissions(result[0].id);
          this.managePermissions(permissions, result[0].nombre);
          this.loading = false;
        }
      }
      else {
        this.loginDisplay = true;
        this.loading = false;
      }
    }
  }

  logout() {
    Swal.fire('El usuario no tiene un perfil asociado')
      .then((resultT) => {
        this.authMsalService.logout();
        this.loginDisplay = true;
        window.location.pathname = "/";
      })
  }

  /**
   * You can subscribe to MSAL events as shown below. For more info,
   * visit: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
   * @memberof AppComponent
   */
  suscribeMsal(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.msalBroadcastService.inProgress$
        .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
          takeUntil(this._destroying$)
        )
        .subscribe(async () => {
          this.checkAndSetActiveAccount();
          let roles = null;
          if (this.authService.instance.getActiveAccount()) {
            roles = await this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims);
          }
          this.loginDisplay = this.authMsalService.setLoginDisplay();
          resolve(roles);
        });
    });
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  async getClaims(claims: any) {
    if (claims) {
      let userId = claims.sub;
      let response = await this.getDataRoles(userId);
      return response;
    }
    return null;
  }

  async getDataRoles(id: any) {
    return await this.rolesService.getUserRoles(id).toPromise()
      .catch((err) => {
        Swal.fire('Ocurrió un error al obtener los roles')
          .then(rt => {
            this.authMsalService.logout();
            this.loginDisplay = true;
            window.location.pathname = "/";
          })
        console.log("Err", err);
      });
  }

  async getDataPermissions(id: any) {
    return await this.rolesService.getUserPermissions(id).toPromise()
      .catch((err) => {
        Swal.fire('Ocurrió un error al obtener los permisos')
          .then(rt => {
            this.authMsalService.logout();
            this.loginDisplay = true;
            window.location.pathname = "/";
          })
        console.log("Err", err);
      });
  }

  managePermissions(permissions: any = [], rolName = "") {
    let loadPermissions = false;
    if (permissions.length === 0) {
      Swal.fire('El usuario no tiene permisos asociados')
        .then((result) => {
          this.authMsalService.logout();
          this.loginDisplay = true;
          window.location.pathname = "/";
        })
      return;
    }
    let objectPermissions: any = {};
    let permissionsActive = [];
    for (let i = 0; i < permissions.length; i++) {
      const element = permissions[i].abm_permisos[0];
      for (let key of Object.keys(element)) {
        if (element[key] === true) {
          permissionsActive.push((permissions[i].ruta).toString().concat('.').concat(key));
        }
      }
      objectPermissions[permissions[i].ruta] = permissionsActive;
      this.ngRolesService.addRoleWithPermissions(permissions[i].ruta, permissionsActive);
      loadPermissions = true;
      permissionsActive = [];
    }
    sessionStorage.setItem("permissions", JSON.stringify(objectPermissions));
    this.loadHeader = true;
    this.isIframe = window !== window.parent && !window.opener;
    if (loadPermissions) {
      let routNavigate = '/';
      rolName = rolName.toLowerCase();
      if (rolName === 'soporte' || rolName ==='superadministrador') {
        routNavigate = "/support";
      }
      else if (rolName === "administradoreds") {
        routNavigate = "/";
      }
      sessionStorage.setItem("rolname", rolName);
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate([routNavigate]);
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }




  registrerUser() {
    const state = this.authMsalService.retunData();
    const dataUserCreate = {
      "usuario": state.sub,
      "rol": 3,
      "nombre": state.given_name,
      "apellido": state.family_name,
      "username": state.name,
      "password": Math.random().toString(36).slice(-8),
      "email": state.otherMails[0],
      "rut": "",
      "update_usuario": state.sub,
    };
    this.userAdminService.saveUser(dataUserCreate).subscribe((res: any) => {
      if (res) {
        this.messagesService.openMessage('El usuario ha sido creado exitosamente', 'success');
        this.logout();
      } else {
        this.messagesService.openMessage(MessagesResponse.error, 'error');
      }
    }, (err) => {
      let messageError = MessagesResponse.error;
      if (err.hasOwnProperty("error")) {
        messageError = err.error.message || MessagesResponse.error;
      }
      this.messagesService.openMessage(messageError, 'error');
    });
  }
}
