import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NamesServices } from 'src/app/core/resources/resources.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  public url = environment.apiUrl;
  constructor(readonly http: HttpClient) { }

  getSeasons(id: string): Observable<any> {
    return this.http.get(`${this.url}${NamesServices.ee_ss}${id}`);
  }
}
