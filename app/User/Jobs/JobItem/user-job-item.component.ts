import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { EditJobComponent } from '../Edit/edit-job.component';
import { Job } from '../../../Job/Job';

@Component({
  moduleId: module.id,
  selector: 'app-user-job',
  templateUrl: 'user-job-item.component.html',
  styleUrls: ['user-job-item.component.css']
})

export class UserJobItemComponent {
  @Input() job: Job;
  @Output() onDelete: EventEmitter<Job> = new EventEmitter<Job>();
  @Output() onEdit: EventEmitter<Job> = new EventEmitter<Job>();
  @ViewChild(EditJobComponent) editModal: EditJobComponent;

  deleteJob(): void {
    this.onDelete.emit(this.job);
  }

  editJob(): void {
    this.onEdit.emit(this.job);
  }
}
