import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ToastService } from '../../core/services/toast.service';
import { Report } from '../../report/Report';
import { ReportService } from '../../report/report.service';
import { Helper } from '../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-report-modal',
  templateUrl: 'report.modal.html'
})

export class ReportModal {
  entity: any;
  reporter: any;
  type: string;
  reportForm: FormGroup;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private reportService: ReportService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      comment: ''
    });
  }

  public init(entity: Object, reporter: Object, type: string) {
    this.entity = entity;
    this.reporter = reporter;
    this.type = type;
  }

  public submit() {
    let report = new Report(this.reporter.id, this.reporter.username, this.entity.id, this.entity.username, this.type);

    if (Helper.submitForm(this.reportForm, report)) {
      this.reportService.create(report).subscribe((report) => {
        this.toastService.info('You reported this ' + this.type);
      });
      this.activeModal.close();
    }
  }

  public close() {
    this.activeModal.dismiss('close');
  }
}
