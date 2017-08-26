import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../user/User';
import { JobService } from '../job.service';
import { Job } from '../Job';
import { UserService } from '../../user/user.service';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';

@Component({
  moduleId: module.id,
  selector: 'app-job-details',
  templateUrl: 'job-details.component.html',
  styleUrls: ['job-details.component.css'],
  providers: [FacebookService]
})

export class JobDetailsComponent implements OnInit {
  job: Job;
  user: User;
  loggedUser: User;
  profileLink: string;
  isLogged: boolean = false;
  isApplied: boolean = false;
  isQualified: boolean = true;

  constructor(private facebookService: FacebookService, private jobService: JobService, private modalService: NgbModal,
    private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.jobService.get(params['id']).subscribe(
        (job: any) => {
          this.job = job;
          this.userService.getUser().subscribe(
            (user) => {
              let i = 0;

              this.loggedUser = user;
              for (i; i < this.loggedUser['profession'].length; i++) {
                if (job.profession === this.isQualified) {
                  this.isQualified = true;
                }
              }
            }
          );
      });
      this.userService.isLogged().subscribe(
        (response) => {
          this.isLogged = !!response;
        }
      );
      this.userService.getDetails(params['username']).subscribe(
        (user: any) => {
          this.user = user;
          this.user.username = params['username'];
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
    this.router.navigate(['employer/details', { username: this.user.username }]);
  }

  public apply() {
    let modal = this.modalService.open(ApplyModalComponent);

    modal.result.then(
      (result) => {
        this.isApplied = true;
      },
      (reason) => { }
    );
  }
}
