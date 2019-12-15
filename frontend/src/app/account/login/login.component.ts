import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getHelloMessage() {
    const date = new Date();
    if (date.getHours() < 17) {
      return 'Bonjour';
    } else {
      return 'Bonsoir';
    }
  }

}
