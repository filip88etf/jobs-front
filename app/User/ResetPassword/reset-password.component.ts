import { Component, OnInit } from '@angular/core';

import { User } from '../User';

@Component({
  moduleId: module.id,
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {
  user: User;

  ngOnInit () {
    this.user = new User();
    this.user.password = '';
  }
}
