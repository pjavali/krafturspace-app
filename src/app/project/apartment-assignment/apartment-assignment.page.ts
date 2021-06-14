import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController, LoadingController, Platform } from "@ionic/angular";

import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';


interface StudentData {
  Name: string;
  Address: string;
  Type:string;
  Assigned:string;
}
@Component({
  selector: 'app-apartment-assignment',
  templateUrl: './apartment-assignment.page.html',
  styleUrls: ['./apartment-assignment.page.scss'],

})
export class ApartmentAssignmentPage implements OnInit {

  projectList = [];
  projectData: StudentData;
  projectForm : FormGroup;


  

  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    
    private platform: Platform,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private router: Router, 

  ) {

    this.projectData = {} as projectData;


  }


  ngOnInit() {

     
     this.projectForm = this.fb.group({

       Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Assigned: ['', [Validators.required]]

  })

  
  this.firebaseService.read_project().subscribe(data => {

      this.projectList = data.map(e => {
        return {
          id: e.payload.doc.id, 
          isEdit: false,
          Name: e.payload.doc.data()['Name'],          
          Address: e.payload.doc.data()['Address'],
          Type: e.payload.doc.data()['Type'], 
          Assigned: e.payload.doc.data()['Assigned'], 

        };
      })
      console.log("id",this.projectList.id);

    });
  }

  CreateRecord() {
    
    console.log("project -->",this.projectForm);

      this.firebaseService.create_project(this.projectForm.value).then(resp => {
      this.projectForm.reset();

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
  addasset(record){

     console.log("user", record)

     let navigationExtras: NavigationExtras = {

      state: {
        user: record
      }
    };
    this.router.navigate(['project-setup'], navigationExtras);

    
  }

   

}
