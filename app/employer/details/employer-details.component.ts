import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../../user/User';
import { EmployerService } from '../../employer/employer.service';
import { Review } from '../../reviews/Review';
import { ReviewService } from '../../reviews/review.service';

@Component({
  moduleId: module.id,
  selector: 'app-employer-details',
  templateUrl: 'employer-details.component.html',
  styleUrls: ['employer-details.component.css']
})

export class EmployerDetailsComponent implements OnInit {
  employer: User;
  reviews: Review[];

  constructor(private employerService: EmployerService, private route: ActivatedRoute,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.employerService.getByUsername(params['username']).subscribe(
        (user: User) => {
          this.employer = user;
        }
      );
      this.reviewService.getEmployerReviews(params['username']).subscribe(
        (reviews: any) => {
          this.reviews = reviews;
        }
      );
    });
  }
}
