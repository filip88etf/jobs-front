import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../user/User';
import { Application } from '../../applications/Application';
import { Employer } from '../../employer/Employer';
import { JobService } from '../job.service';
import { Job } from '../Job';
import { UserService } from '../../user/user.service';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';
import { ApplicationService } from '../../applications/application.service';

@Component({
  moduleId: module.id,
  selector: 'app-job-details',
  templateUrl: 'job-details.component.html',
  styleUrls: ['job-details.component.css'],
  providers: [FacebookService]
})

export class JobDetailsComponent implements OnInit {
  job: Job;
  employer: Employer;
  applications: Application[] = [];
  isApplied: boolean;
  isAccepted: boolean;
  loggedUser: User;
  profileLink: string;
  isLogged: boolean = false;
  isQualified: boolean = false;

  constructor(private facebookService: FacebookService, private jobService: JobService, private modalService: NgbModal,
    private userService: UserService, private router: Router, private route: ActivatedRoute,
    private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.jobService.get(params['id']).subscribe(
        (job: any) => {
          this.job = job;
          this.userService.isLogged().subscribe(
            (response) => {
              if (response) { this.canApply(response); }
            }
          );
      });
      this.userService.isLogged().subscribe(
        (response) => { this.isLogged = !!response; }
      );
      this.userService.getDetails(params['username']).subscribe(
        (user: any) => {
          this.employer = user;
          this.employer.username = params['username'];
      });
    });

    this.facebookService.init({
      appId      : '1490087824391764',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });

    this.profileLink = location.href;
  }

  public openEmployerDetails() {
    this.router.navigate(['employer/details', { username: this.employer.username }]);
  }

  public apply() {
    let modal = this.modalService.open(ApplyModalComponent);

    modal.componentInstance.init(this.job, this.loggedUser);
    modal.result.then(
      (result) => {
        this.isApplied = true;
        this.applications.push(result);
      },
      (reason) => { }
    );
  }

  private canApply(user: any): void {
    this.loggedUser = user;
    if (this.loggedUser.type === 'employer') {
      this.isQualified = false;
      return;
    }
    for (let i = 0; i < this.loggedUser['profession'].length; i++) {
      if (this.job.profession === this.loggedUser['profession']) {
        this.isQualified = true;
      }
    }

    this.applicationService.getByJobId(this.job['id']).subscribe(
      (response: any) => {
        this.applications = response;
        this.isApplied = false;
        for (let i = 0; i < this.applications.length; i++) {
          if (this.applications[i]['workerId'] === this.loggedUser.id) {
            this.isApplied = true;
            this.isAccepted = this.applications[i].status === 'accepted';
          }
        }
      }
    );
  }
}
