import 'rxjs/add/operator/map';
import * as d3 from 'd3';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NextBus } from '../../nextbus.model';

@Injectable()
export class InteractionService {

  // chart variables, dimentions & configurations
  activeRoutes: string[] = [];
  pastVehicles: string[] = [];
  newRoute: string[] = [];
  vehicleGroup: VehicleGroup[];
  buses: FlatArrayBuses[] = [];
  routeColors: any[] = [];
  mapSVG: any;
  mapProjection: any;
  deselected: string[] = [];
  initSwitch: boolean;
  refreshRate = 15000;
  epochTime = '0';

  constructor(private http?: Http) { }

  // fetch only new routes that are selected & draw them
  fetchVehicles = function(selectedTags: any[]) {
    const _currentObj = this;
    return new Promise(function(resolve, reject) {
      _currentObj.newRoute.map((tag) => {
        const tagColor = _currentObj.routeColors.filter(function(color) {
          return color.tag === tag;
        });
        const vehicleGroup: { [tag: string]: any; } = {};
        const epochTime = '0';
        const currentTag = tag;
        const _nb = new NextBus('vehicleLocations', currentTag, epochTime);
        _currentObj.http.get(_nb.basePath, {
          params: {
            command: _nb.command,
            a: _nb.agency,
            r: _nb.route,
            t: _nb.time
          }
        })
          .map(response => response.json())
          .subscribe(vehicleLocations => {
            const allVehicles = Object.assign({}, vehicleLocations).vehicle;
            if (allVehicles) {
              _currentObj.pastVehicles = allVehicles;
              _currentObj.drawBuses(allVehicles, currentTag, tagColor);
            }
          });
      });
      resolve(selectedTags);
    }).then((vehicleArray: any[]) => {
      // storing selected tags for referencing the current state
      _currentObj.activeRoutes = vehicleArray;
    }).catch((err) => {
      console.log(err);
    });
  };

  // method that serves all possible actions states for this service
  populateBuses(selectedTags: any[], _mapObj?: any, _initSwitch?: boolean) {
    const _t = this;
    if (selectedTags.length === 0 && _initSwitch === true) {
      _t.routeColors = _mapObj.colors;
      _t.mapSVG = _mapObj.svg;
      _t.mapProjection = _mapObj.projection;
      _t.initSwitch = false;
      _t.initTimer(_t.refreshRate);
    }
    if (_t.activeRoutes.length < selectedTags.length) {
      _t.newRoute = selectedTags.filter(item => _t.activeRoutes.indexOf(item) < 0);
      _t.activeRoutes = selectedTags;
      _t.fetchVehicles(selectedTags);
      console.log('selected route list: [' + String(_t.activeRoutes) + ']');
    } else if (_t.activeRoutes.length >= selectedTags.length && _t.initSwitch === false && _initSwitch === undefined) {
      const deselected = _t.activeRoutes.filter(item => selectedTags.indexOf(item) < 0);
      _t.activeRoutes = selectedTags;
      _t.dropBuses(deselected);
      console.log('dropped route: [' + String(deselected) + ']');
    }
  }

  refreshBuses() {  // method similar to fetchBuses but very different functionally
    const _t = this;
    return new Promise(function(resolve, reject) {
      _t.activeRoutes.map((tag) => {
        const _nb = new NextBus('vehicleLocations', tag, _t.epochTime);
        _t.http.get(_nb.basePath, {
          params: {
            command: _nb.command,
            a: _nb.agency,
            r: _nb.route,
            t: _nb.time
          }
        })
          .map(response => response.json())
          .subscribe(vehicleLocations => {
            const allVehicles = Object.assign({}, vehicleLocations).vehicle;
            if (allVehicles) {
              _t.transitionBuses(allVehicles, tag);
            } else {
              alert('buses data not available from server for ' + tag + ' !!');
              console.log('buses data not available at server for ' + tag); }
          });
      });
      resolve(_t);
    }).catch((err) => {
      console.log(err);
    });
  }

  initTimer(refRate: number) {
    const _t = this;
    setInterval(function() {
      if (_t.activeRoutes === undefined) {
      } else {
        _t.refreshBuses();
      }
    }, refRate);
  }

  dropBuses(deselected: String[]) {
    const _t = this;
    d3.select('#bus-group-' + String(deselected)).data([]).exit().remove();
    _t.mapSVG.selectAll('.path-' + deselected).style('opacity', 0);
  }

  // buses animated inside map
  transitionBuses(allVehicles: any, routeTag: string) {
    const _t = this;
    const svgGroup = _t.mapSVG.selectAll('.busElement');
    const elementMap = new Map(allVehicles.map(obj => [obj.id, obj]));
    const buses = allVehicles.map(obj => obj.id);

    buses.forEach(function(busName) {
      d3.select('g[id="' + String(busName) + '"]')
        .attr('d', _t.mapSVG.geoPath)
        .transition()
        .attr('transform', function(d) {
          return 'translate(' + _t.mapProjection([
            elementMap.get(String(busName))['lon'],
            elementMap.get(String(busName))['lat']
          ]) + ')';
        }).duration(5000);
    });

  }

  // draw buses after user interaction
  drawBuses(allVehicles: object, currentTag: string, tagColor: object) {
    const _t = this;
    const routeColor = '#' + tagColor[0].color;
    const svgGroup = _t.mapSVG.append('g').attr('id', 'bus-group-' + currentTag);
    const busGroup = svgGroup.selectAll('#bus-group-' + currentTag)
      .data(allVehicles,
      function(d) {
        return d.id;
      })
      .enter()
      .append('g')
      .attr('class', 'busElement')
      .attr('id', function(d) { return d.id; })
      .attr('transform', function(d) {
        return 'translate(' + _t.mapProjection([+d.lon, +d.lat]) + ')';
      });

    busGroup
      .append('circle')
      .attr('r', '10')
      .attr('fill', routeColor)
      .attr('d', _t.mapSVG.geoPath)
      .style('opacity', 0.65)
      .attr('class', 'bus-' + currentTag)
      .attr('class', function(d) { return d.id; });

    busGroup.append('text')
      .attr('fill', '#fff')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('weight', 900)
      .text(function(d) { return d.routeTag; })
      .attr('dy', '0.35em')
      .attr('dx', '-0.325em');

    _t.mapSVG.selectAll('.path-' + currentTag)
      .attr('fill', 'none')
      .style('stroke', routeColor)
      .style('stroke-width', 4)
      .style('opacity', 0.3);
  }

}

interface VehicleGroup {
  route: string;
  buses: any[];
}

interface FlatArrayBuses {
  route: string;
  lat: number;
  lon: number;
}
