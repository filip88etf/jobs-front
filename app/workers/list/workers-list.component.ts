import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Worker } from '../../worker/Worker';
import { WorkerService } from '../../worker/worker.service';

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
  size: number = 10;
  filterParams: any;

  constructor(private router: Router, private route: ActivatedRoute, private workerService: WorkerService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.filterParams = Object.assign({}, params);
      this.workerService.list(params).subscribe(
        (response: any) => {
          this.workers = response.content;
          this.totalNumber = response.page.totalElements;
        }
      );
    });
  }

  public pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.filterParams.page = this.page;
    this.router.navigate(['workers', this.filterParams]);
  }
}
