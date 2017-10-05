import * as d3 from 'd3';
import { Injectable } from '@angular/core';

@Injectable()
export class SetupMapsService {

  constructor() { }

  drawBaseLayerText(_t, mapObj) {

    _t.svgGroup = _t.svg.append('g').attr('id', 'labels');
    _t.geoPath = d3.geoPath()
      .projection(_t.projection);

    _t.svgGroup.selectAll('text')
      .data(mapObj.map.features)
      .enter()
      .append('text')
      // .attr('id', function(e) {
      //   return 'labelId-' + e.properties.neighborho;
      // })
      .text(function(e) {
        return e.properties.neighborho;
      })
      .attr('x', function(e) {
        return _t.geoPath.centroid(e)[0];
      })
      .attr('y', function(e) {
        return _t.geoPath.centroid(e)[1];
      })
      .attr('class', 'pos-middel v-central size-tiny fill-grey weight-bold')
      .each(function(d) {
          // const header = d3.select(this);
          // console.log(header);
          // console.log(d);
          // ['data-class', 'data-hide', 'data-ignore'].forEach(function(key) {
          //     if (key in d)
          //         header.attr(key, d[key]);
          // });
      });
  }

  drawBaseMapLayer(_t, mapObj) {
    let fill: string;
    let stroke: string;
    _t.svgGroup = _t.svg.append('g').attr('id', 'layer_' + mapObj.mapName);
    _t.geoPath = d3.geoPath()
      .projection(_t.projection);

    switch (mapObj.mapName) {
      case 'neighborhoods':
        fill = '#d0e1ed';
        stroke = '#dbdbdb';
        break;
      case 'streets':
        fill = '#fff';
        stroke = '#fff';
        break;
      default:
        fill = '#fff';
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
