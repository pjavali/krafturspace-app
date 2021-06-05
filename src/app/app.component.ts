import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/models/user';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public userProfile: UserProfile;
  public isAdmin;
  public appuser;
 
  constructor(
    private authService: AuthService,
     private router: Router,
  ) {}
  ngOnInit() { 
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
     
      firebase
        .firestore()
        .doc(`/userProfile/${user.uid}`)
        .get()
        .then(userProfileSnapshot => {
          this.isAdmin = userProfileSnapshot.data().isAdmin;
          console.log("isAdmin",  this.isAdmin);
         ;
          this.appuser=user.email;

        });
    }
  });
};

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  };

  
}
