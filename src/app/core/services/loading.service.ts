import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(readonly spinner: NgxSpinnerService) { }

  openSpinner(): void {
    this.spinner.show();
  }

  closeSpinner(): void {
    this.spinner.hide();
  }
}
