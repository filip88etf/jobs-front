import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { UserService } from '../User/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})

export class ResetPasswordComponent {
  email: string;
  resetSuccess: boolean = false;

  constructor(private userService: UserService) {
  }

  resetPassword(): void {
    this.userService.resetPassword(this.email).subscribe(
      () => { this.resetSuccess = true; },
      () => { this.resetSuccess = false; }
    );
    console.log(this.email);
  }
}
