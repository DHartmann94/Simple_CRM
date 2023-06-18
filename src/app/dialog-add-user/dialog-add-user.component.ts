import { Component } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, doc, getDoc, getDocs, addDoc, } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date = new Date();
  loading: boolean = false;


  constructor(private firestore: Firestore) { }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;

    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJSON()).then(async (result) => {
      await getDoc(result);
      this.loading = false;
    });
  }

}
