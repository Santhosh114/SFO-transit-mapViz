import * as d3 from 'd3';
import { Injectable } from '@angular/core';

@Injectable()
export class ManageRoutesService {

  constructor() {
  console.log('hello from manage');
 }

  drawBaseLayerText(_t, mapObj) {

    _t.svgGroup = _t.svg.append('g').attr('id', 'bus-routes');
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

}
