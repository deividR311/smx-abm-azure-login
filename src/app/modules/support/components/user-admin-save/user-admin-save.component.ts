import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from 'src/app/core/services/messages.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesResponse, ResponseApi, ValidationsModal } from 'src/app/core/resources/resources.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { UserAdminService } from '../../services/user-admin.services';
import { SeasonsService } from 'src/app/modules/management/services/seasons.service';
import { RutValidator } from 'src/app/shared/directives/rut.validation';

@Component({
  selector: 'app-user-admin-save',
  templateUrl: './user-admin-save.component.html',
  styleUrls: ['./user-admin-save.component.scss']
})
export class UserAdminSaveComponent implements OnInit {

  userAdminForm: FormGroup;
  save = ValidationsModal.Save;
  listUsers: any = [];
  estaciones: any = [];
  infouser: any;
  rut: any;

  constructor(
    public dialog: MatDialog,
    readonly seasonsService: SeasonsService,
    readonly messagesService: MessagesService,
    readonly formBuilder: FormBuilder,
    readonly authMsalService: AuthMsalService,
    readonly userAdminService: UserAdminService,
    readonly dialogRef: MatDialogRef<UserAdminSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { validation: string }
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.infouser = this.authMsalService.retunData()?.sub;
    this.getUsersUnassociated();
    this.getSeasons();
    this.initForm();
  }

  initForm(): void {
    this.userAdminForm = this.formBuilder.group({
      rut: ['', [Validators.required, RutValidator()]],
      user: ['', Validators.required],
      ideess: ['', Validators.required]
    });
  }

  hasRutError = (controlName: string, errorName: string) => {
    return this.userAdminForm.controls[controlName]?.hasError(errorName);
  }

  getUsersUnassociated(): any {
    this.userAdminService.getUsersUnassociated().subscribe(res => {
      if (res.status === ResponseApi.Succes) {
        this.listUsers = res.data;
      }
    });
  }

  getSeasons(): any {
    this.seasonsService.getSeasons(this.infouser).subscribe(res => {
      if (res.status === ResponseApi.Succes) {
        this.estaciones = res.data;
      }
    });
  }

  openConfirmAction() {
    this.messagesService.openConfirmAction('¿Estás seguro que deseas salir sin guardar los cambios?', 'warning').then((result: any) => {
      if (result.isConfirmed) {
        this.closeModal()
      }
    })
  }

  closeModal() {
    this.dialog.closeAll();
  }

  captureData(event: any) {
    this.rut = event.target.value;
  }
 
  saveRolUserAdmin() {
    const data = this.createEntity();

    this.userAdminService.setRol(data).subscribe((res: any) => {
      if (res) {
        this.messagesService.openMessage('El registro ha sido creado exitosamente', 'success');
        this.closeModal()
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

  /**
   * This function returns an ATTENDER entity, depending on whether it is to save or update
   * @memberof AttendantsSaveComponent
   */
  createEntity(): any {
    let data = {};
    if (this.data.validation === this.save) {
      const stationList = this.userAdminForm.value.ideess.map((el: any) => {
        return Number(el);
      });
      data = {
        rut: this.rut,
        usuario: this.userAdminForm.value.user,
        rol: 3,
        estaciones: stationList,
        update_usuario: this.infouser
      }
    }
    return data;
  }
}
