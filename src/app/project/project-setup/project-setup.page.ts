import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup, Validators, } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { HttpClient} from '@angular/common/http';

import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, Platform } from "@ionic/angular";
import { FirebaseService } from 'src/app/services/firebase.service';








 export interface Option {
        label: string;
        placeholder: string;
        required: boolean;
        type: string;
    }

    export interface RootObject {
        key: string;
        tyype: string;
        option: Option;
    }

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.page.html',
  styleUrls: ['./project-setup.page.scss'],
})

export class ProjectSetupPage implements OnInit {
// data :any[]=[];

projectsetup = [];
projectsetupData: projectsetupData;
projectsetupForm : FormGroup;

 selectedVal:Number=103;
 data2:any;
 data:any;
Kustostring:string;
 constructor(
 private Platform:Platform,
 public http:HttpClient,
 private auth: AngularFireAuth,
 private route: ActivatedRoute, private router: Router,
 private afFirestore :AngularFirestore,
 private toastCtrl: ToastController,
 private firestore: AngularFirestore, 
 private platform: Platform,
 private firebaseService: FirebaseService,
 public fb: FormBuilder,
   

 ){
   this.projectsetupData = {} as projectsetupData;

   this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        console.log("recived data",this.data)
      }
    });

   
   this.Platform.ready().then(()=>{
   fetch('./assets/kus.json').then(res => res.json())
    .then(json => {
      this.data2 = json;
      console.log(this.data2)
      
      
     
    });
     
   


   })
 }
  ngOnInit() {

     this.projectsetupForm = this.fb.group({

       Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Assigned: ['', [Validators.required]]


   
  })

  this.firebaseService.read_project().subscribe(data => {

      this.projectsetupList = data.map(e => {
        return {
          id: e.payload.doc.id, 
          isEdit: false,
          Name: e.payload.doc.data()['Name'],          
          Address: e.payload.doc.data()['Address'],
          Type: e.payload.doc.data()['Type'], 
          Assigned: e.payload.doc.data()['Assigned'], 

        };
      })
      console.log("id",this.projectsetupList);

    });
  }
  CreateRecord() {
    
    console.log("project -->",this.projectsetupForm);

      this.firebaseService.create_project(this.projectForm.value).then(resp => {
      this.projectsetupForm.reset();

    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_project(rowID);
  }

  EditRecord(record) {

    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAddress = record.Address;  
    record.EditType = record.Type;
    record.EditAssigned = record.Assigned;

  }

  UpdateRecord(recordRow) {

    let record = {};

    record['Name'] = recordRow.EditName;
    record['Address'] = recordRow.EditAddress;
    record['Type'] = recordRow.EditType;
    record['Assigned'] = recordRow.EditAssigned;
    this.firebaseService.update_project(recordRow.id, record);
    recordRow.isEdit = false;
  }
  
  

  OnChange(event){
    alert("you have selected id  "+ event.target.value);
  }
}
