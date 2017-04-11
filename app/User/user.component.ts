import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})

export class UserComponent {
  active: number = 1;
}
