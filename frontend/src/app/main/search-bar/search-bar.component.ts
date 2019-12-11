import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../address.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() inputChange: EventEmitter<string> = new EventEmitter();
  value = '';
  @Input() autoCompleteAddresses: Address[];

  constructor() { }

  ngOnInit() {
  }

  onValidatedSearch(event: Event) {
    event.preventDefault();
    this.search.emit(this.value);
  }

  onInput() {
    this.inputChange.emit(this.value);
  }

}
