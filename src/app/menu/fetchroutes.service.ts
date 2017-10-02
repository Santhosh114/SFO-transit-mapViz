import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NextBus } from '../nextbus.model';

@Injectable()
export class FetchroutesService {

  _nb = new NextBus('routeList');
  _nbURL = this._nb._basePath + 'command=' + this._nb._command + '&a=' + this._nb._agency;

  constructor(private http: Http) {
  }

  fetchData() {
    return this.http.get(this._nbURL)
    .map(
      (response) => response.json()
    );
  }
}
