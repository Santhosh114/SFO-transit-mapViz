import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NextBus } from '../../nextbus.model';

@Injectable()
export class FetchRoutePathsService {

  constructor(private http: Http) {
    console.log('hello from fetch');
}
  // _nb = new NextBus('routeList');
  //
  // fetchData() {
  //   return this.http.get(this._nb._basePath, {
  //     params: {
  //       command: this._nb._command,
  //       a: this._nb._agency
  //     }
  //   })
  //   .map(
  //     (response) => response.json()
  //   );
  // }
}
