import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { AccountService } from "../account.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },  {
    validators: [validateSamePassword]
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
    const {email, password, ..._} = this.form.value;
    this.accountService.register(email, password).pipe(
      take(1)
    ).subscribe(
      (success) => {
        if (success) {
          this.snackBar.open('Votre compte a bien été créé', null, {duration: 3000});
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open('Cette adresse mail est déjà utilisée', null, {duration: 3000});
          this.form.get('email').setErrors({alreadyExists: 'L\'utilisateur existe déjà'});
        }
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

function validateSamePassword(control: AbstractControl): ValidationErrors | null {
  const group = control as FormGroup;
  return group.get('password').value !== group.get('confirmPassword').value ?
    {samePassword: 'The two password must be the equals'} :
    null;
}
