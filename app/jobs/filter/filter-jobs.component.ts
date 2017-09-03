import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TYPES, CITIES, PROFESSIONS } from '../../global-consts';
import { Helper } from '../../helper';
import { JobService } from '../job.service';

@Component({
  moduleId: module.id,
  selector: 'app-filter-jobs',
  templateUrl: 'filter-jobs.component.html',
  styleUrls: ['filter-jobs.component.css']
})

export class FilterJobsComponent {
  types: Object[] = TYPES;
  regions: Object[] = CITIES;
  professions: Object[] = PROFESSIONS;
  filterGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: JobService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.filterGroup = this.formBuilder.group({
      region: this.route.params['value'].region,
      profession: this.route.params['value'].profession
    });
  }

  filterData(): void {
    let filter: any = {};
    if (Helper.submitForm(this.filterGroup, filter)) {
      filter.page = this.route.params['value'].page;
      this.router.navigate(['jobs', filter]);
    }
  }
}
