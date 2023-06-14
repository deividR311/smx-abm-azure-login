import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NamesServices } from 'src/app/core/resources/resources.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  public url = environment.apiUrl;
  public urlAttendannts = environment.apiUrlAtendedor;

  constructor(readonly http: HttpClient) { }

  getUsersUnassociated(): Observable<any> {
    return this.http.get(`${this.url}${NamesServices.users}${NamesServices.usersUnassociated}`);
  }

  getAdminUsers(): Observable<any> {
    return this.http.get(`${this.url}${NamesServices.users}${NamesServices.getAdminUsers}`);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.url}${NamesServices.users}${NamesServices.saveUser}`, user);
  }
  
  setRol(entity: any): Observable<any> {
    return this.http.post(`${this.url}${NamesServices.users_rol}${NamesServices.setRol}`, entity);
  }
}
