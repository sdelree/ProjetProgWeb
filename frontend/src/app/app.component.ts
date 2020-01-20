import { Component, OnInit } from '@angular/core';
import { AccountService } from "./account/account.service";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.checkCurrentToken().pipe(
      take(1)
    ).subscribe()
  }

}
