import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-user-job',
  templateUrl: 'user-job-item.component.html',
  styleUrls: ['user-job-item.component.css']
})

export class UserJobItemComponent {
  @Input() job: Object;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  deleteJob(): void {
    this.onDelete.emit('sdlfkasd');
  }
}
