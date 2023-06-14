import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { IconsFolderAssest } from 'src/app/core/resources/resources.enum';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dataUser: any;
  icon = IconsFolderAssest.LogoEsmax;
  iconSetting = IconsFolderAssest.Setting;
  private readonly _destroying$ = new Subject<void>();
  public rol = sessionStorage.getItem('rolname');
  constructor(
    readonly router: Router,
    readonly authMsalService: AuthMsalService,
    private readonly authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.activeAcount();
    this.getDatUser();
    
  }

  activeAcount() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
  }

  getDatUser() {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims)
      });
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getClaims(claims: any) {
    this.dataUser = claims?.given_name + '  ' + claims?.family_name;
  }

  logout(): any {
    this.messagesService.openConfirmAction('¿Está seguro que desea cerrar sesión?', 'warning').then((result: any) => {
      if (result.isConfirmed) {
        this.authMsalService.logout();
      }
    })
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  redirectAdmin() {
    this.router.navigate(['/'])
  }

  redirectAdminEDS() {
    this.router.navigate(['/support'])
  }
}
