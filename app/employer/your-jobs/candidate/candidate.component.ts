import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { Worker } from '../../../worker/Worker';
import { ApplicationService } from '../../../applications/application.service';
import { Application } from '../../../applications/Application';

@Component({
  moduleId: module.id,
  selector: 'app-candidate',
  templateUrl: 'candidate.component.html',
  styleUrls: ['candidate.component.css']
})

export class CandidateComponent implements OnInit {
  @Input() candidate: Worker;
  @Output() onAccept: EventEmitter<Worker> = new EventEmitter<Worker>();
  isAccepted: boolean = false;

  constructor(private router: Router, private modalService: NgbModal, private applicationService: ApplicationService) {
  }

  public ngOnInit() {
    this.isAccepted = this.candidate['application'].status === 'accepted';
  }

  public openWorkerDetails() {
    this.router.navigate(['workers/details', { username: this.candidate.username }]);
  }

  public accept() {
    let modal = this.modalService.open(ConfirmModalComponent);

    modal.componentInstance.init('Accept ' + this.candidate.firstName + ' ' + this.candidate.lastName,
      'If you accept this worker your job will go in progress and won\'t be visible to public any more', 'Accept');
    modal.result.then(
      (result) => {
        this.candidate['application'].status = 'accepted';
        this.applicationService.update(this.candidate['application']).subscribe((response) => {
          this.isAccepted = true;
          this.onAccept.emit(this.candidate);
        });
      },
      (reason) => { }
    );
  }
}
