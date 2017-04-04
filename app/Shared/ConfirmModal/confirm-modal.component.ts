import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-confirm-modal',
  templateUrl: 'confirm-modal.component.html'
})

export class ConfirmModalComponent {
  headerText: string;
  bodyText: string;
  submitText: string;
  cancelText: string;
  @ViewChild('confirmModal') public modal: ModalDirective;
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  open(headerText: string = '', bodyText: string = '', submitText: string = 'Ok', cancelText: string = 'Cancel') {
    this.headerText = headerText;
    this.bodyText = bodyText;
    this.submitText = submitText;
    this.cancelText = cancelText;
    this.modal.show();
  }

  submit(): void {
    this.onSubmit.emit(true);
    this.close();
  }

  close(): void {
    this.modal.hide();
  }
}
