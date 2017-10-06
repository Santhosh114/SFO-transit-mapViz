import { Component, OnInit } from '@angular/core';
import { FetchroutesService } from '../services/fetchroutes.service';
import { WindowRefService } from '../../global-services/window-ref.service';

@Component({
  selector: 'app-toggleroutes',
  templateUrl: './toggleroutes.component.html',
  styleUrls: ['./toggleroutes.component.css']
})
export class ToggleroutesComponent implements OnInit {
  routetags: RouteTags[];
  numbers = new RegExp(/^[0-8]\d*$/);
  character = new RegExp(/^[A-Z]$/);
  _window: Window;
  constructor(private getRouteTags: FetchroutesService,
              public windowRef: WindowRefService) {
              this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    const _t = this;
    _t.getRouteTags.fetchTags().subscribe((tags) => {
      _t.routetags = tags.route;
    });
  }

  selectedOptions() {
    console.log(this.routetags
            .filter(opt => opt.checked)
            .map(opt => opt.tag));
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
