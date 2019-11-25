import { Component, OnInit } from '@angular/core';
import {AddressService} from './address.service';
import {Observable} from 'rxjs';
import {Address} from './address.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  autoComplete: Observable<Address[]>;

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit() {
  }

  onSearch(value: string) {
    this.addressService.getMatchingAddress(value).subscribe(addresses => console.log(addresses));
  }

  onAutoComplete(value: string) {
    if (value !== '') {
      this.autoComplete = this.addressService.getMatchingAddress(value);
    }
  }
}
