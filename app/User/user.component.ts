import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})

export class UserComponent {
  active: number = 1;
  constructor(private router: Router) {
    this.active = this.router['location'].path() === '/user/profile' ? 1 : 2;
  }
}
