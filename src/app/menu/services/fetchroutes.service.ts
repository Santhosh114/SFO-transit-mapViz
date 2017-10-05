import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NextBus } from '../../nextbus.model';

@Injectable()
export class FetchroutesService {

  _nb = new NextBus('routeList');

  constructor(private http: Http) {
  }

  fetchData() {
    return this.http.get(this._nb._basePath, {
      params: {
        command: this._nb._command,
        a: this._nb._agency
      }
    })
    .map(
      (response) => response.json()
    );
  }
}
