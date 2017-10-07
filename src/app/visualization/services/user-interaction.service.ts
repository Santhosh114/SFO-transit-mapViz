import 'rxjs/add/operator/map';
import * as d3 from 'd3';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NextBus } from '../../nextbus.model';

@Injectable()
export class InteractionService {
  activeRoutes: string[] = [];
  pastVehicles: string[] = [];
  newRoute: string[] = [];
  vehicleGroup: VehicleGroup[] = [];
  buses: FlatArrayBuses[] = [];
  routeColors: any[] = [];
  mapSVG: any;
  mapProjection: any;
  deselected: string[] = [];
  initSwitch: boolean;

  constructor(private http?: Http) { }

  dropBuses(deselected) {
    const _t = this;
    d3.select('#bus-group-' + String(deselected)).data([]).exit().remove();
    _t.mapSVG.selectAll('.pathBind' + deselected)
      .style('opacity', 0);
  }

  drawVehicles(allVehicles, currentTag, tagColor) {
    const _t = this;
    const svgGroup = _t.mapSVG.append('g').attr('id', 'bus-group-' + currentTag);
    const routeColor = '#' + tagColor[0].color;

    _t.mapSVG.selectAll('.pathBind' + currentTag)
      .attr('fill', 'none')
      .style('stroke', routeColor)
      .style('stroke-width', 4)
      .style('opacity', 0.3);

    svgGroup.selectAll('.busBind' + currentTag)
      .data(allVehicles)
      .enter()
      .append('circle')
      .attr('r', '10')
      .attr('fill', routeColor)
      .attr('d', _t.mapSVG.geoPath)
      .style('opacity', 0.65)
      .attr('transform', function(d) {
        return 'translate(' + _t.mapProjection([+d.lon, +d.lat]) + ')';
      })
      .attr('class', 'busBind' + currentTag);

    svgGroup.selectAll('.busTextBind' + currentTag)
      .data(allVehicles)
      .enter()
      .append('text')
      .attr('class', 'busTextBind' + currentTag + ' busText')
      .attr('fill', '#fff')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('weight', 900)
      .text(function(d) { return d.routeTag; })
      .attr('dy', '0.35em')
      .attr('dx', '-0.325em')
      .attr('transform', function(d) {
        return 'translate(' + _t.mapProjection([+d.lon, +d.lat]) + ')';
      });
  }

  refreshBuses(currentObj, selectedTags: any[]) {
    const _t = this;
    console.log('inside refresh');
    console.log(_t.pastVehicles);
    // _t.fetchVehicles(_t, selectedTags);
  }


  fetchVehicles = function(_currentObj, selectedTags) {
    return new Promise(function(resolve, reject) {
      _currentObj.newRoute.map((tag) => {
        const tagColor = _currentObj.routeColors.filter(function(color) {
          return color.tag === tag;
        });
        const vehicleGroup: { [tag: string]: any; } = {};
        const epochTime = '0';
        const currentTag = tag;
        const _nb = new NextBus('vehicleLocations', tag, epochTime);
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
              _currentObj.drawVehicles(allVehicles, currentTag, tagColor);
            }
          });
      });
      resolve(selectedTags);
    }).then((vehicleArray: any[]) => {
      _currentObj.activeRoutes = vehicleArray;
    }).catch((err) => {
      console.log(err);
    });
  };

  // method to make http call to fetch all selected routes
  populateBuses(selectedTags: any[], _mapObj?: any, _initSwitch?: boolean) {
    const _t = this;
    if (selectedTags.length === 0 && _initSwitch === true) {
      _t.routeColors = _mapObj.colors;
      _t.mapSVG = _mapObj.svg;
      _t.mapProjection = _mapObj.projection;
      _t.initSwitch = false;
    }
    if (_t.activeRoutes.length < selectedTags.length) {
      _t.newRoute = selectedTags.filter(item => _t.activeRoutes.indexOf(item) < 0);
      _t.activeRoutes = selectedTags;
      _t.fetchVehicles(_t, selectedTags);
      console.log('new set of selected route: [' + String(_t.activeRoutes) + ']');
    } else if (_t.activeRoutes.length === selectedTags.length && selectedTags.length !== 0) {
      _t.activeRoutes = selectedTags;
      console.log('active route only updates');
      _t.refreshBuses(_t, selectedTags);
    } else if (_t.activeRoutes.length >= selectedTags.length && _t.initSwitch === false && _initSwitch === undefined) {
      const deselected = _t.activeRoutes.filter(item => selectedTags.indexOf(item) < 0);
      _t.activeRoutes = selectedTags;
      _t.dropBuses(deselected);
      console.log('dropped route: [' + String(deselected) + ']');
    }
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
