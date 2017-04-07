import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Option } from '../../../global-types';
import { CITIES, PROFESSIONS } from '../../../global-consts';

@Component({
  moduleId: module.id,
  selector: 'app-edit-job',
  templateUrl: 'edit-job.component.html'
})

export class EditJobComponent {
  selected: Option[];
  locations: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Object;
  @ViewChild('editJobModal') public modal: ModalDirective;
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.job = {description: '', location: undefined, profession: undefined};
  }

  open(job: Object) {
    this.job = job;
    this.modal.show();
  }

  editJob(): void {
    this.onSubmit.emit(true);
    this.close();
  }

  close(): void {
    this.modal.hide();
  }
}
