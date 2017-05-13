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
  }

  info(message: string = 'Info', title: string = 'Info') {
    this.options = toastOptions;
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.info(this.options);
  };

  success(message: string = 'Success', title: string = 'Success') {
    this.options = toastOptions;
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.success(this.options);
  }

  error(message: string = 'Error', title: string = 'Error') {
    this.options = toastOptions;
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.error(this.options);
  }

  warning(message: string = 'Warning', title: string = 'Warning') {
    this.options = toastOptions;
    this.options.title = title;
    this.options.msg = message;
    this.toastyService.warning(this.options);
  }
}
