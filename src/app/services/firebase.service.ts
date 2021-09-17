import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = 'Krafturspace1';

  constructor(private firestore: AngularFirestore) {}

  create_project(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_project() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  lastaccess_project() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_project(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_project(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  getdata() {}
}
