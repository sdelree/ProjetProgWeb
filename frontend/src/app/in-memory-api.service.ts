import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryApiService implements InMemoryDbService {

  constructor() { }

  public createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {
      vehicles : [
        {id: 1, electric: true, height: 2},
        {id: 2, electric: false, height: 2.5},
        {id: 3, electric: false, height: 1.8},
        {id: 4, electric: false, height: 1.4},
        {id: 5, electric: false, height: 1.7},
        {id: 6, electric: true, height: 1.2}
      ]
    };
  }
}
