import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../account.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {email, password} = this.form.value;
    this.accountService.login(email, password).pipe(
      take(1)
    ).subscribe(
      () => {
        this.snackBar.open('Vous êtes authentifié', null, {duration: 3000});
        this.router.navigate(['/']);
      }
    );
  }

  getHelloMessage(): string {
    const date = new Date();
    if (date.getHours() < 17) {
      return 'Bonjour';
    }
    return 'Bonsoir';
  }
}
