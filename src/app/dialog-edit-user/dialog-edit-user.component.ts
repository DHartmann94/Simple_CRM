import { Component } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  userId!: string;
  user!: User;
  birthDate: Date = new Date();
  loading: boolean = false;


  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  /**
   * Updates the user data in Firestore.
   * Updates the user document with the updated userId.
   * We only access the data once to update it, no ongoing subscription is required. (then)
   */
  async updateUser() {
    this.loading = true;

    const userDoc = doc(this.firestore, 'users', this.userId);
    updateDoc(userDoc, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });

  }

}
