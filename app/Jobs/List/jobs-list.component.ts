import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Job } from '../Job';
import { JobService } from '../job.service';
import { Filter } from '../../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-jobs-list',
  templateUrl: 'jobs-list.component.html',
  styleUrls: ['jobs-list.component.css']
})

export class JobsListComponent {
  page: number = 1;
  totalNumber: number;
  jobs: Job[];
  filter: Filter;
  size: number = 10;

  constructor(private router: Router, private route: ActivatedRoute, private jobService: JobService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.filter = Object.assign(new Filter(), params);
      this.jobService.list(this.filter).subscribe(
        (response: any) => {
          this.jobs = response.content;
          this.totalNumber = response.page.totalElements;
        }
      );
    });
  }

  public pageChanged(pageNumber: number) {
    this.filter.page = this.page = pageNumber;
    this.router.navigate(['workers', this.filter]);
  }
}
