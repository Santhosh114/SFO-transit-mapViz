import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NextBus } from '../../nextbus.model';

@Injectable()
export class FetchroutesService {

  constructor(private http: Http) {}

  fetchTags() {
    const _nb = new NextBus('routeList');
    return this.http.get(_nb.basePath, {
      params: {
        command: _nb.command,
        a: _nb.agency
      }
    })
    .map(
      (response) => response.json()
    );
  }
}
