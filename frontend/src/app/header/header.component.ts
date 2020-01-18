import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  isAuthenticated(): Observable<boolean> {
    return this.accountService.isAuthenticated();
  }

  logout(): void {
    this.accountService.logout()
      .subscribe(
        _ => this.snackBar.open('Vous vous êtes déconnecté(e)', null, {duration: 3000}),
        err => this.snackBar.open('La déconnexion a échoué', null, {duration: 3000})
      );
  }
}
