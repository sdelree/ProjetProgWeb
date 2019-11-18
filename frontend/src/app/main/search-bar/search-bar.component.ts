import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  value: string = '';

  constructor() { }

  ngOnInit() {
  }

  onValidatedSearch(event: Event) {
    event.preventDefault();
    this.search.emit(this.value);
  }

}
