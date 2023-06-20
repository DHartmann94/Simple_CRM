import { Component } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId: string = '';
  user: User = new User();


  constructor(private firestore: Firestore, private route: ActivatedRoute, public dialog: MatDialog) { }

  /**
   * Subscribes to the route parameters and assigns the 'id' parameter to the userId property.
   */
  ngOnInit(): void {
    this.route.params.subscribe((param) => (
      this.userId = param['id']
    ));
    this.getUser();
  }

  /**
   * Retrieves user data from Firestore and assigns it to the 'user' property.
   * Creates a reference to the 'users' collection in Firestore using the provided userId.
   * Registers a snapshot listener on the document reference to listen for changes in the user data.
   * Creates a new User object using the data retrieved from the document snapshot.
   */
  getUser() {
    const docRef = doc(this.firestore, 'users', this.userId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      this.user = new User(docSnap.data());
    });
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent);
  }

  editAddress() {
    this.dialog.open(DialogEditAddressComponent);
  }

}
