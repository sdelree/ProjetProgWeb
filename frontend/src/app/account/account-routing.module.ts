import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CanLogInGuard } from './can-log-in.guard';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CanLogInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanLogInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
