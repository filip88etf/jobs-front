import { Component } from '@angular/core';

import { EditUserComponent } from './User/edit-user.component';
import { EditWorkerComponent } from './Worker/edit-worker.component';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-edit-profile',
  moduleId: module.id,
  templateUrl: 'edit-profile.component.html'
})

export class EditProfileComponent {
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => { console.log(error); }
    );
  }
}
