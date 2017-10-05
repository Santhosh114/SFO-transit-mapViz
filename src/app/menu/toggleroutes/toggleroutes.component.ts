import { Component, OnInit } from '@angular/core';

import { FetchroutesService } from '../services/fetchroutes.service';

@Component({
  selector: 'app-toggleroutes',
  templateUrl: './toggleroutes.component.html',
  styleUrls: ['./toggleroutes.component.css']
})
export class ToggleroutesComponent implements OnInit {
  routetags: RouteTags[];
  constructor(private getRouteTags: FetchroutesService) {
  }

  ngOnInit() {
    this.getRouteTags.fetchData().subscribe((tags) => {
      this.routetags = tags.route;
    });
  }
}

interface RouteTags {
  tag: string;
  title: string;
}
