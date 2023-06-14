import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { ResponseApi, ValidationsModal } from 'src/app/core/resources/resources.enum';
import { AttendantsService } from '../../services/attendants.service';
import { SeasonsService } from '../../services/seasons.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendantsSaveComponent } from '../attendants-save/attendants-save.component';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnChanges {

  seasons: any = [];
  idStation: any = null;
  station: any = [];
  ee_ss: any = [];
  iscreate: boolean = false;
  public infouser: any;
  @Input() permisos: any;
  constructor(
    readonly seasonsService: SeasonsService,
    readonly attendantsService: AttendantsService,
    public dialog: MatDialog,
    private authMsalService: AuthMsalService) { }


  ngOnInit(): void {
    this.infouser = this.authMsalService.retunData()?.sub;
    this.getSeasons();
  }

  ngOnChanges() {
    this.getSeasons();
  }


  /**
   *
   *
   * @memberof SeasonsComponent
   */
  openDialog() {
    this.iscreate = false;
    const dialogRef = this.dialog.open(AttendantsSaveComponent, {
      width: '600px',
      disableClose: false,
      data: { validation: ValidationsModal.Save, atendedor: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSeasons();
      this.iscreate = true;
    });
  }



  /**
   *
   *
   * @return {*}  {*}
   * @memberof SeasonsComponent
   */
  getSeasons(): any {
    this.seasons = [];
    this.seasonsService.getSeasons(this.infouser).subscribe(res => {
      this.getAttendantsCount(res.data);

    });
  }



  /**
   *
   *
   * @param {string} id
   * @param {*} data
   * @memberof SeasonsComponent
   */
  captureIdStation(id: string, data: any) {
    this.idStation = null;
    this.station = null;
    this.idStation = id;
    this.station = data;
  }



  /**
   *
   *
   * @param {*} arreglo
   * @return {*}  {*}
   * @memberof SeasonsComponent
   */
  getAttendantsCount(arreglo: any): any {
    arreglo.forEach((element: any) => {
      this.getAttendantsCount1(element);
    });
  }



  /**
   *
   *
   * @param {*} element
   * @memberof SeasonsComponent
   */
  getAttendantsCount1(element: any) {
    this.attendantsService.getAttendantsCount(element.ee_ss.ideess).subscribe(res => {
      const ee_ss = {
        ideess: element.ee_ss.ideess,
        usuariosActivos: res.data,
        nombrefantasia: element.ee_ss.nombrefantasia
      }
      this.seasons.push(ee_ss);
    });
  }

}
