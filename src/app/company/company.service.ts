import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = environment.API_BASE; // 'http://firebootcamp-crm-api.azurewebsites.net/api';

  private companies$ = new BehaviorSubject<Company[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log('TAP', x)),
        catchError(e => this.errorHandler<Company[]>(e))
      ).subscribe(c => this.companies$.next(c));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  deleteCompany(company: Company) {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(catchError(e => this.errorHandler<Company>(e)))
      .subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company){
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') }
    )
    .pipe(catchError(e => this.errorHandler<Company>(e)))
    .subscribe(c => this.loadCompanies());
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(e => this.errorHandler<Company>(e)))
    .subscribe(c => this.loadCompanies());
  }


  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(catchError(e => this.errorHandler<Company>(e)));
  }

  errorHandler<T>(error: Error): Observable<T> {
    console.error('ERROR CAUGHT IN SERVICE', error);
    throw error;
  }


}
