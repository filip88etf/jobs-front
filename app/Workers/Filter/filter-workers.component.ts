import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TYPES, CITIES, PROFESSIONS } from '../../global-consts';
import { Filter } from '../../global-types';
import { Helper } from '../../helper';
import { WorkerService } from '../../Worker/worker.service';

@Component({
  moduleId: module.id,
  selector: 'app-filter-workers',
  templateUrl: 'filter-workers.component.html',
  styleUrls: ['filter-workers.component.css']
})

export class FilterWorkersComponent {
  types: Object[] = TYPES;
  regions: Object[] = CITIES;
  professions: Object[] = PROFESSIONS;
  filterGroup: FormGroup;
  filter: Filter;

  constructor(private formBuilder: FormBuilder, private workerService: WorkerService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.filterGroup = this.formBuilder.group({
      region: this.route.params['value'].region,
      profession: this.route.params['value'].profession
    });
    this.filter = new Filter();
  }

  filterData(): void {
    if (Helper.submitForm(this.filterGroup, this.filter)) {
      this.filter.page = this.route.params['value'].page;
      this.router.navigate(['workers', this.filter]);
    }
  }
}
