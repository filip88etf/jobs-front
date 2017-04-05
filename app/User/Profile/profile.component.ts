import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { User } from '../User';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;
  @ViewChild(ConfirmModalComponent) public confirmModal: ConfirmModalComponent;

  ngOnInit() {
    this.user = new User();
    this.user.firstName = 'Filip';
    this.user.lastName = 'Djordjevic';
    this.user.gender = 'Male';
    this.user.phone = '0601434835';
    this.user.email = 'eing.filip@gmail.com';
    this.user.birth = '06 Aug 1988';
    this.user.username = 'ficko';
  }

  openModal(): void {
    this.confirmModal.open(
      'Hide Profile',
      'Your profile won\'t be visible on this site anymore. Are you sure you want to hide your profile?',
      'Hide');
  }

  hideProfile(hide: boolean): void {
    console.log('Profile is hidden');
  }
}