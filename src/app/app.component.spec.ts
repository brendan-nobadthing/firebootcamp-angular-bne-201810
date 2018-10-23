import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CompanyService } from './company/company.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let companySvc;

  beforeEach(() => {
    companySvc = {
      getCompanies: () => {}
    };
    component = new AppComponent(companySvc);
  });

  it('add 1+1', () => {
    expect(1 + 1).toEqual(2);
  });

  it(`title equals 'firebootcamp-crm'`, () => {
    const myComponent = new AppComponent(null);
    expect(myComponent.title).toEqual('firebootcamp-crm');
  });

  it(`companyCount SpyOn`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company A',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      },
      {
        name: 'Fake Company B',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      }
    ]));
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });
}); // emd describe

describe('AppComponent - Test Bed', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);
  }); // end beforeEach


  it(`companyCount = 1`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      }
    ]));
    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }));

    const el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');

  });

});
