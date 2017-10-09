import { Component, OnInit } from '@angular/core';
import { FetchroutesService } from '../services/fetchroutes.service';
import { InteractionService } from '../../visualization/services/user-interaction.service';

@Component({
  selector: 'app-toggleroutes',
  templateUrl: './toggleroutes.component.html'
})
export class ToggleroutesComponent implements OnInit {
  routetags: RouteTags[];
  currentTag: string[];
  numbers = new RegExp(/^[0-8]\d*$/);
  character = new RegExp(/^[A-Z]$/);
  removeTag = new RegExp(/.*-(.*)/);
  constructor(private getRouteTags: FetchroutesService,
    private userInteraction: InteractionService) { }

  ngOnInit() {
    const _t = this;
    _t.getRouteTags.fetchTags().subscribe((tags) => {
      _t.routetags = tags.route;
    });
  }
  // called upon user interaction
  updateRoutes() {
    const _t = this;
    _t.currentTag = this.routetags
      .filter(opt => opt.checked)
      .map(opt => opt.tag);
    _t.userInteraction.populateBuses(_t.currentTag);
    return this.routetags
      .filter(opt => opt.checked)
      .map(opt => opt.tag);
  }
}

interface RouteTags {
  tag: string;
  title: string;
  checked: boolean;
}
