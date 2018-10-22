import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    console.log('getCompanies called');
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log('TAP', x)),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: Error): Observable<Company[]> {
    console.error('ERROR CAUGHT IN SERVICE', error);
    throw error;
  }


}
