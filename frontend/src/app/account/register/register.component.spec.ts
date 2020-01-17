import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from '../account.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    const spyAccount = jasmine.createSpyObj( 'AccountService', ['register']);
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ NoopAnimationsModule, ReactiveFormsModule, MatInputModule, MatSnackBarModule ],
      providers: [
        { provide: Router, useValue: spyRouter },
        { provide: AccountService, useValue: spyAccount }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
