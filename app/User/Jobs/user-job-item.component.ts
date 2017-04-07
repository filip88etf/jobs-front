import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { EditJobComponent } from './Edit/edit-job.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-job',
  templateUrl: 'user-job-item.component.html',
  styleUrls: ['user-job-item.component.css']
})

export class UserJobItemComponent {
  @Input() job: Object;
  @Output() onDelete: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onEdit: EventEmitter<Object> = new EventEmitter<Object>();
  @ViewChild(EditJobComponent) editModal: EditJobComponent;

  deleteJob(): void {
    this.onDelete.emit(this.job);
  }

  editJob(): void {
    this.onEdit.emit(this.job);
  }
}
