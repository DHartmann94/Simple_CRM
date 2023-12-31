import { Component, OnInit } from '@angular/core';
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
export class UserDetailComponent implements OnInit {
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

  /**
   * Opens a dialog to edit user the user.
   * The user object to be passed to the dialog component. (componentInstance)
   * User is copied to a new object for editing. (new User(this.user.toJSON()))
   * Passes the userId in the other component.
   */
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());;
    dialog.componentInstance.userId = this.userId;
  }

}
