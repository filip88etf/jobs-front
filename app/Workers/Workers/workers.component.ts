import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Filter } from '../../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-workers',
  templateUrl: 'workers.component.html'
})

export class WorkersComponent {
  filter: Filter;
  constructor(private route: ActivatedRoute) {
    console.log('aaa');
  }

  public onFilterChange(filter: Filter) {
    this.filter = filter;
  }
}
