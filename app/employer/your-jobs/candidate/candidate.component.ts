import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { Worker } from '../../../worker/Worker';

@Component({
  moduleId: module.id,
  selector: 'app-candidate',
  templateUrl: 'candidate.component.html',
  styleUrls: ['candidate.component.css']
})

export class CandidateComponent {
  @Input() candidate: Worker;
  @Output() onAccept: EventEmitter<boolean> = new EventEmitter<boolean>();
  isAccepted: boolean = false;
  additionalComment: string = 'necu da radim za tu sicu ili daj dobar kes ili cao';

  constructor(private router: Router, private modalService: NgbModal) {
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
        this.isAccepted = true;
        this.onAccept.emit(true);
      },
      (reason) => { this.onAccept.emit(false); }
    );
  }
}
