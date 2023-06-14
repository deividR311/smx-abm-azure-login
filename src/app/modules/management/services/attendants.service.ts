import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NamesServices } from 'src/app/core/resources/resources.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendantsService {

  public url = environment.apiUrl;
  public urlAttendannts = environment.apiUrlAtendedor;
  constructor(readonly http: HttpClient) { }


  /**
   *
   *
   * @param {*} id
   * @return {*}  {Observable<any>}
   * @memberof AttendantsService
   */
  getAttendants(id: any): Observable<any> {
    return this.http.get(`${this.url}${NamesServices.ee_ss}${NamesServices.getAttendantseess}${id}`);
  }


  /**
   *
   *
   * @param {*} id
   * @return {*}  {Observable<any>}
   * @memberof AttendantsService
   */
  getAttendantsCount(id: any): Observable<any> {
    return this.http.get(`${this.url}${NamesServices.ee_ss}${NamesServices.getAttendantscount}${id}`);
  }


  /**
   *
   *
   * @param {*} atendant
   * @return {*}  {Observable<any>}
   * @memberof AttendantsService
   */
  saveAttendantsCount(atendant: any): Observable<any> {
    return this.http.post(`${this.urlAttendannts}${NamesServices.atendedor}${NamesServices.saveAttendant}`, atendant);
  }


  /**
   *
   *
   * @param {*} atendant
   * @return {*}  {Observable<any>}
   * @memberof AttendantsService
   */
  updateAttendantsCount(atendant: any, id: any): Observable<any> {
    return this.http.put(`${this.urlAttendannts}${NamesServices.atendedor}${NamesServices.updateAttendant}${id}`, atendant);
  }
}
