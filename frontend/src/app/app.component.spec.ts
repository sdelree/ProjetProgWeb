import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from "@angular/core";
import { AccountService } from "./account/account.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    const accountSpy = jasmine.createSpyObj('AccountService', ['checkCurrentToken']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderStubComponent
      ],
      providers: [
        { provide: AccountService, useValue: accountSpy }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {}
