import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NextBus } from '../../nextbus.model';

@Injectable()
export class DrawRoutePathsService {
  public routeColors: RouteColors[] = [];
  // this service is used once for drawing routes onto maps
  constructor(private http: Http) { }

  // method to draw paths given a route list
  drawPaths(route, _map) {
    const _t = this;
    const svgGroup = _map.svg.append('g').attr('id', 'route-path-' + route.tag).attr('class', 'route-path');

    // append individual routes after the map layer & before the text labels
    const routePathLayer = document.getElementById('route-path-' + route.tag);
    const svg = document.getElementsByTagName('svg')[0];
    svg.insertBefore(routePathLayer, svg.children[4]);

    const pathsToDraw = [];
    route.path.forEach(function(path) {
      const links = _t.restructurePath(path);
      pathsToDraw.push(links);
    });
    svgGroup.selectAll('.path-' + route.tag)
      .data(pathsToDraw)
      .enter()
      .append('path')
      .attr('d', _map.geoPath)
      .style('stroke', '#008fe5')
      .style('strokewidth', '2')
      .style('opacity', 0)
      .attr('class', 'path-' + route.tag);

  }

  // method to convert points into LineString co-ordinates
  restructurePath(pathCoordinates) {
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: pathCoordinates.point.map(measure => {
          return [+measure.lon, +measure.lat];
        })
      }
    };
  }

  // method to make http call to fetch all routes
  drawRoutes(_map) {
    return new Promise((resolve, reject) => {
      const _t = this;
      const _nb = new NextBus('routeConfig');
      _t.http.get(_nb.basePath, {
        params: {
          command: _nb.command,
          a: _nb.agency
        }
      })
        .map(response => response.json())
        .subscribe(allRoutes => {
          if (allRoutes.route) {
            allRoutes.route.map((rawRoute) => {
              _t.routeColors.push({ tag: rawRoute.tag, color: rawRoute.color });
              _t.drawPaths(rawRoute, _map);
            });
          } else { throw new Error('NextBus data not fetched!'); }
          resolve(_t);
        });
    }).catch((err) => {
      console.log(err);
    });
  }
}

interface RouteColors {
  tag: string;
  color: string;
}
