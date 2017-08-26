import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Worker } from '../../worker/Worker';
import { WorkerService } from '../../worker/worker.service';
import { Filter } from '../../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-workers-list',
  templateUrl: 'workers-list.component.html',
  styleUrls: ['workers-list.component.css']
})

export class WorkersListComponent {
  page: number = 1;
  totalNumber: number;
  workers: Worker[];
  filter: Filter;
  size: number = 10;

  constructor(private router: Router, private route: ActivatedRoute, private workerService: WorkerService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.filter = Object.assign(new Filter(), params);
      this.workerService.list(this.filter).subscribe(
        (response: any) => {
          this.workers = response.content;
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
