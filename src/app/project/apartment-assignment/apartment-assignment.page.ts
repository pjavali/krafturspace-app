import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

import { PassdataService } from 'src/app/services/passdata.service';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/models/user';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

interface StudentData {
  Name: string;
  Address: string;
  Type: any;
  Assigned: any;
  Flat_Number: string;
}

@Component({
  selector: 'app-apartment-assignment',
  templateUrl: './apartment-assignment.page.html',
  styleUrls: ['./apartment-assignment.page.scss']
})
export class ApartmentAssignmentPage implements OnInit {
  projectList = [];
  projectData: StudentData;
  projectForm: FormGroup;
  data: any;
  viewType: boolean;
  responceData: any;
  status: any;
  au: any;
  userlist = [];
  Ulist: any = [];

  constructor(private toastCtrl: ToastController, private firestore: AngularFirestore, private _cdr: ChangeDetectorRef, private platform: Platform, private firebaseService: FirebaseService, public fb: FormBuilder, private router: Router, public alertCtrl: AlertController, public navCtrl: NavController, private userServ: PassdataService) {
    this.projectData = {} as StudentData;
  }

  ngOnInit() {
    //31-07-2021

    const db = firebase.firestore();

    db.collection('userProfile')
      .orderBy('email')
      .get()
      .then(snapshot => {
        //console.log("snapshot----->",snapshot.docs);
        snapshot.docs.forEach(doc => {
          // this.userlist = doc.data();

          this.userlist.push(doc.data());

          //this.inspectuser.push(doc.id)

          //this.inspectlist.push(doc.data());
        });
      });

    this.projectForm = this.fb.group({
      Name: ['Vaswani Exquisite', [Validators.required]],
      Address: ['ITPL Main Rd, next to Hotel Zuri, Maruthi Nagar, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, 560066', [Validators.required]],
      Type: ['', [Validators.required]],
      Assigned: ['', [Validators.required]],
      Flat_Number: ['', [Validators.required]]
    });

    this.firebaseService.read_project().subscribe(data => {
      this.projectList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Address: e.payload.doc.data()['Address'],
          Type: e.payload.doc.data()['Type'],
          Assigned: e.payload.doc.data()['Assigned'],
          Flat_Number: e.payload.doc.data()['Flat_Number']
        };
      });
      console.log('id', this.projectList);
    });
  }

  CreateRecord() {
    console.log('project -->', this.projectForm.value);

    this.projectForm.value['Foyer'] = '';
    this.projectForm.value['CommonToilet'] = '';
    this.projectForm.value['LivingRoom'] = '';
    this.projectForm.value['Dining'] = '';
    this.projectForm.value['Kitchen'] = '';
    this.projectForm.value['ServantsRoom'] = '';
    this.projectForm.value['MasterBedRoom'] = '';
    this.projectForm.value['BedRoom1'] = '';
    this.projectForm.value['BedRoom2'] = '';

    this.firebaseService
      .create_project(this.projectForm.value)
      .then(resp => {
        this.projectForm.reset();
        this.router.navigate(['apartment-assignment']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // RemoveRecord(rowID) {
  //   this.firebaseService.delete_project(rowID);
  // }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAddress = record.Address;
    record.EditType = record.Type;
    record.EditAssigned = record.Assigned;
    record.EditFlat_Number = record.Flat_Number;
  }

  UpdateRecord(recordRow) {
    let record = {};

    record['Name'] = recordRow.EditName;
    record['Address'] = recordRow.EditAddress;
    record['Type'] = recordRow.EditType;
    record['Assigned'] = recordRow.EditAssigned;
    record['Flat_Number'] = recordRow.EditFlat_Number;

    this.firebaseService.update_project(recordRow.id, record);
    recordRow.isEdit = false;
    console.log('from update', recordRow.id);
  }

  addasset(record) {
    console.log('user', record);

    let navigationExtras: NavigationExtras = {
      state: {
        user: record
      }
    };

    this.router.navigate(['project-setup'], navigationExtras);

    // console.log("add but--->",record.Type);

    if (record.Type == '2BHK') {
      this.viewType = false;
      console.log('now viewType is', this.viewType);
    } else {
      this.viewType = true;
    }
    //this.userServ.setNavData(this.viewType);
    //this.userServ.changeData(this.viewType);
  }

  async RemoveRecord(rowID) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete Project',
      message: 'Do you want to Delete this project?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          cssClass: 'icon-color',
          handler: data => {
            this.firebaseService.delete_project(rowID);
            console.log('Items Removed!');
            //Call you API to remove Items here.
          }
        }
      ]
    });
    await alert.present();
  }

  ontypeChange(): void {
    let Type = this.projectForm.get('Type').value;

    this._cdr.detectChanges();
  }
}
