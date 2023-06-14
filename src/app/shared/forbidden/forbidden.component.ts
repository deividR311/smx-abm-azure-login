import { Component, OnInit } from '@angular/core';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
