import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor() { }

  ngOnInit() {
    this.companies = this.getCompanies();
  }

  getCompanies(): Company[] {
    return [
      { name: 'SSW', phone: 123456, email: 'ssw@ssw.com.au' },
      { name: 'Microsoft', phone: 123456, email: 'info@microsoft.com' },
      { name: 'Google', phone: 123456, email: 'info@google.com' },
    ];
  }

}
