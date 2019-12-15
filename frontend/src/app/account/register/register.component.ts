import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
