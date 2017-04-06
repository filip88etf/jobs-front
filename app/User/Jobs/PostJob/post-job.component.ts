import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Option } from '../../../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-post-job',
  templateUrl: 'post-job.component.html'
})

export class PostJobComponent implements OnInit {
  selected: Option[];
  locations: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Object;
  @ViewChild('postJobModal') public modal: ModalDirective;
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.job = {description: '', location: undefined, profession: undefined};
  }

  open() {
    this.modal.show();
  }

  postJob(): void {
    this.onSubmit.emit(true);
    this.close();
  }

  close(): void {
    this.modal.hide();
  }
}
