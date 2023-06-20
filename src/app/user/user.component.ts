import { Component } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: User = new User(); // Kann vielleicht raus!
  allUsers: any = [];

  constructor(private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersFromFirebase();
  }

  /**
   * Retrieves user data from Firebase Firestore and onSnapshot() listens for real-time changes.
   * map; Converts the documents in the snapshot into an array of user objects.
   * id: doc.id, ...doc.data(); Find the ID in the Firebase object using the spread operator.
   * allUsers = []; Updates the local variable with the new user data.
   */
  getUsersFromFirebase() {
    let changes;
    const collectionUsersRef = collection(this.firestore, 'users');
    onSnapshot(collectionUsersRef, (snapshot) => {
      changes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // ...doc.data = Spread Operator
      this.allUsers = changes;
      console.log('Users:', this.allUsers);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
