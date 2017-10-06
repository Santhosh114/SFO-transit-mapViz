import * as d3 from 'd3';
import { Injectable } from '@angular/core';

@Injectable()
export class SetupMapsService {

  // method to overlay text on to the maps
  drawBaseLayerText(_t, mapObj) {
    _t.svgGroup = _t.svg.append('g').attr('id', 'labels');
    _t.svgGroup.selectAll('text')
      .data(mapObj.map.features)
      .enter()
      .append('text')
      .text(function(e) {
        return e.properties.neighborho;
      })
      .attr('x', function(e) {
        return _t.geoPath.centroid(e)[0];
      })
      .attr('y', function(e) {
        return _t.geoPath.centroid(e)[1];
      })
      .attr('class', 'pos-middel v-central size-tiny fill-semiBlack weight-bold');
  }

  // method to layer maps on the base SVG element
  drawBaseMapLayer(_t, mapObj) {
    let fill: string;
    let stroke: string;
    _t.svgGroup = _t.svg.append('g').attr('id', 'layer_' + mapObj.mapName);
    switch (mapObj.mapName) {
      case 'neighborhoods':
        fill = '#edebd0';
        stroke = '#dbdbdb';
        break;
      case 'streets':
        fill = '#cbe5a6';
        stroke = '#fff';
        break;
      default:
        fill = '#cbe5a6';
        stroke = '#d3d3d3';
        break;
    }
    _t.svgGroup.selectAll('path')
      .data(mapObj.map.features)
      .enter()
      .append('path')
      .style('fill', fill)
      .style('stroke', stroke)
      .attr('d', _t.geoPath);
  }

}
