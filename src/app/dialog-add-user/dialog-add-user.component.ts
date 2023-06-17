import { Component } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date = new Date()

  constructor() {}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user:', this.user);
  }

}
