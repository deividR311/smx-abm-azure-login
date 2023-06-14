import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { MessagesResponse } from 'src/app/core/resources/resources.enum';
import { MessagesService } from 'src/app/core/services/messages.service';
import { UserAdminService } from './services/user-admin.services';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  infouser: any;

  constructor(private router: Router, readonly userAdminService: UserAdminService, readonly messagesService: MessagesService, readonly authMsalService: AuthMsalService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation?.extras.state as {
        dataUserCreate: any
      };
      if (state) {
        this.registrerUser(state);
      }
    }
  }

  registrerUser(state: any) {
    this.infouser = this.authMsalService.retunData()?.sub;
    const dataUserCreate = {
      "usuario": state.dataUserCreate.oid,
      "rol": 3,
      "nombre": state.dataUserCreate.given_name,
      "apellido": state.dataUserCreate.family_name,
      "username": state.dataUserCreate.name,
      "password": Math.random().toString(36).slice(-8),
      "email": state.dataUserCreate.emails[0],
      "rut": state.dataUserCreate.extension_RUT,
      "update_usuario": this.infouser
    };
    this.userAdminService.saveUser(dataUserCreate).subscribe((res: any) => {
      if (res) {
        this.messagesService.openMessage('El usuario ha sido creado exitosamente', 'success');
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
