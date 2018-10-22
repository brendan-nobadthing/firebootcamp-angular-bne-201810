import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'SSW', phone: 123456, email: 'ssw@ssw.com.au' },
      { name: 'Microsoft', phone: 123456, email: 'info@microsoft.com' },
      { name: 'Google', phone: 123456, email: 'info@google.com' },
    ];
  }


}
