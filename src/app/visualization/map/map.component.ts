import * as d3 from 'd3';
import { Component, OnInit } from '@angular/core';
import { SetupMapsService } from '../services/setup-maps.service';
import { InteractionService } from '../services/user-interaction.service';
import { DrawRoutePathsService } from '../services/draw-routepaths.service';

@Component({
  selector: 'app-map',
  template: '',
})
export class MapComponent implements OnInit {

  // chart variables, dimentions & configurations
  mapHeight = 730;
  mapWidth = 870;
  baseProjectionScale = 290000;
  baseMapCenter = [-122.433701, 37.767683];
  mapRotation = [0, 0];
  svg: any;
  svgGroup: any;
  geoPath: any;
  projection: any;
  baseMaps: BaseMaps[];
  colors: any;

  // initializing services for  map container with dependancy injection
  constructor(private setupBaseMap: SetupMapsService,
    private drawRoutePaths: DrawRoutePathsService,
    private userInteraction: InteractionService) {}

  ngOnInit() {
    const _t = this;
    const _initArray = [];
    const _initSwitch = true;

    // setting up an SVG to draw maps
    const promise = new Promise((resolve, reject) => {
      _t.svg = d3.select('app-map')
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('viewBox', '-10 -20 ' + _t.mapWidth + ' ' + _t.mapHeight)
        .attr('width', _t.mapWidth)
        .attr('height', _t.mapHeight)
        .style('background', '#d0e1ed');
      _t.projection = d3.geoMercator()
        .scale(_t.baseProjectionScale)
        .rotate(_t.mapRotation)
        .center(_t.baseMapCenter)
        .translate([_t.mapWidth / 2, _t.mapHeight / 2]);
      _t.geoPath = d3.geoPath()
        .projection(_t.projection);
      d3.queue()
        .defer(d3.json, '/assets/geoJSON/streets.json')
        .defer(d3.json, '/assets/geoJSON/neighborhoods.json')
        .defer(d3.json, '/assets/geoJSON/freeways.json')
        .defer(d3.json, '/assets/geoJSON/arteries.json')
        .await(drawBaseMap);

      function drawBaseMap(error, streets, neighborhoods, freeways, arteries) {
        if (error) { console.log(error); }
        _t.baseMaps = [{ mapName: 'neighborhoods', map: neighborhoods },
        { mapName: 'streets', map: streets },
        { mapName: 'freeways', map: freeways },
        { mapName: 'arteries', map: arteries }];
        _t.baseMaps.map((element) => {
          _t.setupBaseMap.drawBaseMapLayer(_t, element);  // passing map object to service
        });
        _t.setupBaseMap.drawBaseLayerText(_t, _t.baseMaps[0]); // passing map object to service
        // resolve after the base layer is rendered
        resolve(_t);
      }
    });

    // fetching data from NextBus & setting up the paths for all routes
    promise.then((thisObj) => {
      return _t.drawRoutePaths.drawRoutes(thisObj);
    }).then((routePaths: any) => {
      _t.colors = routePaths.routeColors;
      // passing map object to service
      return _t.userInteraction.populateBuses(_initArray, _t, _initSwitch);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }
}

interface BaseMaps {
  mapName: string;
  map: any;
  mapGroup?: any;
}
