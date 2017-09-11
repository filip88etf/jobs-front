import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Job } from '../Job';
import { User } from '../../user/User';
import { Application } from '../../applications/Application';
import { JobService } from '../job.service';
import { ApplicationService } from '../../applications/application.service';
import { UserService } from '../../user/user.service';

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
  filter: any;
  size: number = 10;
  applications: Application[];
  loggedUser: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private jobService: JobService,
    private applicationService: ApplicationService, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.filter = Object.assign({}, params);
      this.userService.isLogged().subscribe(
        (user: any) => {
          this.loggedUser = user;
          if (user && user.type === 'worker') {
            this.mapJobsAndWorkerApplications(user);
          } else {
            this.jobService.list(this.filter).subscribe(
              (response: any) => {
                this.jobs = response.content;
                this.totalNumber = response.page.totalElements;
              }
            );
          }
        }
      );
    });
  }

  public pageChanged(pageNumber: number) {
    this.filter.page = this.page = pageNumber;
    this.router.navigate(['jobs', this.filter]);
  }

  private mapJobsAndWorkerApplications (user: User) {
    forkJoin([
      this.jobService.list(this.filter),
      this.applicationService.getByWorkerId(user.id)
    ]).subscribe((results: any) => {
      this.jobs = results[0].content;
      this.applications = results[1];
      this.totalNumber = results[0].page.totalElements;
    });
  }
}
