import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        catchError(e => this.errorHandler<Company[]>(e))
      );
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(catchError(e => this.errorHandler<Company>(e)));
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') }
    )
    .pipe(catchError(e => this.errorHandler<Company>(e)))

  }

  errorHandler<T>(error: Error): Observable<T> {
    console.error('ERROR CAUGHT IN SERVICE', error);
    throw error;
  }


}
