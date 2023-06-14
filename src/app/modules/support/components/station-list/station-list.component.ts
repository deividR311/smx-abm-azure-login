import { Component, OnInit } from '@angular/core';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { ValidationsModal } from 'src/app/core/resources/resources.enum';
import { MatDialog } from '@angular/material/dialog';
import { UserAdminSaveComponent } from '../user-admin-save/user-admin-save.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  public infouser: any;
  iscreate: boolean = false;
  signUpRedirectURL = environment.signUpRedirectURL;
  urlOauth2B2c = environment.urlOauth2B2c;
  signUp = environment.b2cConfig.signUp;
  clientId = environment.b2cConfig.clientId;

  constructor(public dialog: MatDialog, private authMsalService: AuthMsalService) { }

  ngOnInit(): void {
    this.infouser = this.authMsalService.retunData()?.sub;
  }

  openDialogCreate() {
    window.open(`${this.urlOauth2B2c}/authorize?p=${this.signUp}&client_id=${this.clientId}&nonce=defaultNonce&redirect_uri=${this.signUpRedirectURL}&scope=openid&response_type=id_token&prompt=login&prueba=login`, "_self");
  }

  openDialog() {
    this.iscreate = false;
    const dialogRef = this.dialog.open(UserAdminSaveComponent, {
      width: '600px',
      disableClose: false,
      data: { validation: ValidationsModal.Save }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.iscreate = true;
    });
  }

}
