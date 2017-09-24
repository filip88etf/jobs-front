import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';

import { ReviewService } from '../../reviews/review.service';
import { Review } from '../../reviews/Review';
import { WorkerService } from '../../worker/worker.service';
import { UserService } from '../../user/user.service';
import { Worker } from '../../worker/Worker';

@Component({
  moduleId: module.id,
  selector: 'app-worker-details',
  templateUrl: 'worker-details.component.html',
  styleUrls: ['worker-details.component.css'],
  providers: [FacebookService]
})

export class WorkerDetailsComponent implements OnInit {
  worker: Worker;
  profileLink: string;
  isLogged: boolean;
  reviews: Review[];
  page: number = 1;
  totalNumber: number = 0;
  size: number = 10;

  constructor(private facebookService: FacebookService, private workerService: WorkerService, private router: Router,
    private route: ActivatedRoute, private userService: UserService, private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.workerService.getDetails(params['username']).subscribe(
        (worker: any) => {
          this.worker = worker;
      });
      this.reviewService.getWorkerReviews(params).subscribe(
        (response: any) => {
          this.reviews = response.content;
          this.totalNumber = response.page.totalElements;
        }
      );
    });

    this.userService.isLogged().subscribe(
      (response) => {
        this.isLogged = !!response;
      }
    );

    this.facebookService.init({
      appId      : '1490087824391764',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });

    this.profileLink = location.href;
  }

  public pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.router.navigate(['workers/details', { username: this.worker.username, page: this.page }]);
  }
}