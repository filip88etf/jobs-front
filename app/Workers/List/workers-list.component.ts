import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Worker } from '../../Worker/Worker';
import { WorkerService } from '../../Worker/worker.service';
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
  size: number = 30;

  constructor(private router: Router, private route: ActivatedRoute, private workerService: WorkerService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.filter = Object.assign(new Filter(), params);

      this.filter.page--; // REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
      this.workerService.list(this.filter).subscribe(
        (response: any) => {
          // let worker1 = new Worker();
          // worker1.firstName = 'filip';
          // worker1.lastName = 'djordjevic';
          // worker1.phone =
          // let worker2 = new Worker();
          // worker2.firstName = 'Ivan';
          // worker2.lastName = 'Vukasinovic';
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
