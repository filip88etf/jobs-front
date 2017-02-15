import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  private username: string = '';
  private password: string = '';

  login (): void {
    console.log(this.username);
    console.log(this.password);
    console.log('login is click');
  }
}
