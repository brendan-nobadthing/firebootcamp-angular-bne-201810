import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: Company[];

  @Output()
  deleteClicked = new EventEmitter<Company>();

  constructor() { }
  ngOnInit() {
  }

  deleteCompany(company: Company) {
    this.deleteClicked.emit(company);
  }

  logChanges() {
    console.log('CHANGES!');
  }

}
