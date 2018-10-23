import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyId: number;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyId == 0;

    this.buildForm();

    if(!this.isNewCompany){
      // Get Company details
    }
  }

  buildForm(){
    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        phone: [''],
        email: ['']
      }
    );
  }

  saveCompany(){
    this.companyService.addCompany(this.companyForm.value)
    .subscribe(company => {
      this.router.navigateByUrl('/company/list');
    })
  }

}
