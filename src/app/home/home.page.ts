import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserCredential } from 'src/app/models/user';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public isAdmin;

  constructor(private router: Router) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/userProfile/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.isAdmin = userProfileSnapshot.data().isAdmin;
            console.log('isAdmin', this.isAdmin);
          });
      }
    });
  }
  onprojectsetClick() {
    console.log('button click');
    this.router.navigateByUrl('project-setup');
  }
  onapartmentsetClick() {
    this.router.navigateByUrl('apartment-assignment');
    console.log('button click');
  }
  oninspectionClick() {
    this.router.navigateByUrl('inspection');
    console.log('button click');
  }
  onReportClick() {
    this.router.navigateByUrl('reports');
    console.log('button click');
  }
}
