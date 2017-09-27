import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../user/User';
import { EmployerService } from '../../employer/employer.service';
import { Review } from '../../reviews/Review';
import { ReviewService } from '../../reviews/review.service';
import { ReportModal } from '../../shared/report/report.modal';
import { UserService } from '../../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-employer-details',
  templateUrl: 'employer-details.component.html',
  styleUrls: ['employer-details.component.css']
})

export class EmployerDetailsComponent implements OnInit {
  employer: User;
  reviews: Review[];
  loggedUser: Object;
  isLogged: boolean = false;

  constructor(private employerService: EmployerService, private route: ActivatedRoute, private userService: UserService,
    private reviewService: ReviewService, private modalService: NgbModal) {
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

    this.userService.isLogged().subscribe(
      (response: any) => {
        this.isLogged = !!response;
        this.loggedUser = response;
      }
    );
  }

  public report(): void {
    let modal = this.modalService.open(ReportModal);

    modal.componentInstance.init(this.employer, this.loggedUser, 'employer');
    modal.result.then(
      (result) => { },
      (reason) => { }
    );
  }
}
