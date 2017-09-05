import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

const toastOptions: ToastOptions = {
    title: 'Success',
    msg: 'Message',
    showClose: true,
    timeout: 5000,
    theme: 'bootstrap'
};

@Injectable()
export class ToastService {
  options: ToastOptions = toastOptions;

  constructor(private toastyService: ToastyService) {
    this.options = toastOptions;
  }

  public info(message: string = 'Info', title: string = 'Info') {
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.info(this.options);
  };

  public success(message: string = 'Success', title: string = 'Success') {
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.success(this.options);
  }

  public error(message: string = 'Error', title: string = 'Error') {
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.error(this.options);
  }

  public warning(message: string = 'Warning', title: string = 'Warning') {
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.warning(this.options);
  }
}
