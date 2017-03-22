import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  private username: string = '';
  private password: string = '';
  private resetForm: boolean = false;

  constructor(private router: Router) {
  }

  login (): void {
    this.router.navigate(['user/profile']);
  }

  resetPassword(): void {
  }
}
