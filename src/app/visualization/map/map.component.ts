import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SetupMapsService } from '../setup-maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapHeight = 760;
  mapWidth = 800;
  baseProjectionScale = 260000;
  baseMapCenter = [-122.433701, 37.767683];
  mapRotation = [0, 0];
  baseMaps: BaseMaps[];
  svg: any;
  svgGroup: any;
  geoPath: any;
  projection: any;

  constructor(private setupBaseMap: SetupMapsService) {
  }

  ngOnInit() {
    const _t = this;
    _t.svg = d3.select('app-map')
               .append('svg')
               .attr('preserveAspectRatio', 'xMidYMid slice')
               .attr('viewBox', '0 0 ' + _t.mapWidth + ' ' + _t.mapHeight)
               .attr('width', _t.mapWidth)
               .attr('height', _t.mapHeight);
    _t.projection = d3.geoMercator()
                      .scale(_t.baseProjectionScale)
                      .rotate(_t.mapRotation)
                      .center(_t.baseMapCenter)
                      .translate([_t.mapWidth / 2, _t.mapHeight / 2]);
    d3.queue()
      .defer(d3.json, '/assets/geoJSON/streets.json')
      .defer(d3.json, '/assets/geoJSON/neighborhoods.json')
      .defer(d3.json, '/assets/geoJSON/freeways.json')
      .defer(d3.json, '/assets/geoJSON/arteries.json')
      .await(drawBaseMap);

      function drawBaseMap(error, streets, neighborhoods, freeways, arteries) {
        if (error) { console.log(error); }
          _t.baseMaps = [{mapName: 'neighborhoods', map: neighborhoods},
                         {mapName: 'streets', map: streets},
                         {mapName: 'freeways', map: freeways},
                         {mapName: 'arteries', map: arteries}];

          _t.baseMaps.forEach(function(element) {
                      _t.setupBaseMap.drawBaseMapLayer(_t, element);
                    });
          _t.setupBaseMap.drawBaseLayerText(_t, _t.baseMaps[0]);
      }
  }

}

interface BaseMaps {
  mapName: string;
  map: any;
  mapGroup?: any;
}
