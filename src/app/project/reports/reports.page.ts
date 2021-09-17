import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Papa } from 'ngx-papaparse';

import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage-angular';

import { Item, StorageService } from 'src/app/services/storage.service';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { FilePath } from '@ionic-native/file-path/ngx';
import { promise } from 'protractor';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage implements OnInit {
  projectdata: any[] = [];

  constructor(
    private Platform: Platform,
    private _cdr: ChangeDetectorRef,
    public http: HttpClient,
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private afFirestore: AngularFirestore,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private platform: Platform,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private camera: Camera,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,

    private emailComposer: EmailComposer,
    public storageService: StorageService,
    private papa: Papa,
    private file: File,
    private socialSharing: SocialSharing,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.create();
  }

  projectCSV() {
    this.storageService
      .getObject('socialdata')
      .then(result => {
        if (result != null) {
          this.projectdata = result;
        }
      })
      .catch(e => {
        console.log('error: ', e);
      });

    console.log('project data', this.projectdata);

    var csv = this.papa.unparse(this.projectdata);

    if (this.platform.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'project_data.csv', csv, { replace: true }).then(
        res => {
          this.socialSharing
            .share(null, null, res.nativeURL, null)
            .then(e => {
              // Success
            })
            .catch(e => {
              console.log('Share failed:', e);
            });
        },
        err => {
          console.log('Error: ', err);
        }
      );
    } else {
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'project_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  cleardata() {
    this.storageService.remove('socialdata');
    //this.storageService.clear();
    this.storage.clear();
    this.projectdata = [];
  }
}
