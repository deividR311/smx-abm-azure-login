import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public url = environment.apiUrl;
  constructor(readonly http: HttpClient) { }

  getUserRoles(id: any): Observable<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http
      .post<any>(`${this.url}roles/getUserRoles`, { id }, options)
      .pipe(map(res => res.data));
  }

  getUserPermissions(id: any): Observable<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http
      .post<any>(`${this.url}roles/getUserPermissions`, { id }, options)
      .pipe(map(res => res.data));
  }
}
