import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '../Shared/ConfirmModal/confirm-modal.component';
import { CITIES, PROFESSIONS } from '../global-consts';
import { Option } from '../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {
  cities: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  isJobSearch: boolean = true;
  startSearch: boolean = false;
  proffesion: Option;
  city: Option;

  constructor(private modalService: NgbModal) {}

  showMessage(selected: Option): string {
    if (selected === undefined && this.startSearch) {
      return 'Please select one';
    }
    return '';
  }

  public searchJobs (value: boolean): void {
    this.isJobSearch = value;
  }

  search(): void {
    let modal = this.modalService.open(ConfirmModalComponent);

    modal.componentInstance.init('Info', 'Are you sure?');
    modal.result.then(
      (result) => { console.log('result = ' + result); },
      (reason) => { console.log('reason = ' + reason); }
    );
    this.startSearch = true;
  }
}
