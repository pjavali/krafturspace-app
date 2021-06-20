import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup, Validators, } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { HttpClient} from '@angular/common/http';

import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, Platform,AlertController } from "@ionic/angular";
import { FirebaseService } from 'src/app/services/firebase.service';

import { PassdataService } from 'src/app/services/passdata.service';

interface StudentData {
  Name: string;
  Address: string;
  Type:any;
  Assigned:string;
   
  
  Foyer: string;
  CommonToilet: string;
  LivingRoom:string;
  Dining:string;
  Kitchen:string;
  ServantsRoom:string;
  MasterBedRoom:string;
  BedRoom1:string;
  BedRoom2:string;
}





 

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.page.html',
  styleUrls: ['./project-setup.page.scss'],
})

export class ProjectSetupPage implements OnInit {
// data :any[]=[];

viewType;
recivedData=[];
AssetData:any;
rstatus=[];
record ={};
currentId: any
currentuser:any;
FAssetData:any;
projectsetupList = [];
projectsetupData: StudentData ;
projectsetupForm : FormGroup;
EFoyer:any;
ECommonToilet:any;
ELivingRoom:any;
EDining:any;
EKitchen:any;
EServantsRoom:any;
EMasterBedRoom:any;
EBedRoom1:any;
EBedRoom2:any;

  sentData: any;

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
 private userServ: PassdataService, 
private alertCtrl: AlertController

 ){
   this.projectsetupData = {} as StudentData;
   
  

   this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        
        console.log("recived data",this.data.id)
        this.currentId=this.data.id;

        console.log("recived data",this.data.Type)
        
        this.recivedData=this.data;
        this.sentData=this.data.Type;
        if(this.sentData == "2BHK"){
          this.viewType=false

        }else{
          this.viewType=true
        }

       
        console.log("viewtype is ",this.viewType)
         
      }
    });

   
 }
  ngOnInit() {

  // this.userServ.serviceData
   //   .subscribe(data => (this.sentData = this.viewType));
    


     console.log("recived data",this.recivedData)

     if(this.recivedData.length === 0){
       console.log("array is empty")
       this.router.navigate(['apartment-assignment']);
     }
    

     this.projectsetupForm = this.fb.group({

        Name: ['Vaswani Exquisite', [Validators.required]],
      Address: ['ITPL Main Rd, next to Hotel Zuri, Maruthi Nagar, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, 560066', [Validators.required]],
      Type: ['', [Validators.required]],
      Assigned: ['', [Validators.required]],
       
       Foyer: ['', [Validators.required]],
       CommonToilet: ['', [Validators.required]],
      LivingRoom: ['', [Validators.required]],
       Dining: ['', [Validators.required]],
        Kitchen: ['', [Validators.required]],
         ServantsRoom: ['', [Validators.required]],
          MasterBedRoom: ['', [Validators.required]],
          BedRoom1: ['', [Validators.required]],
          BedRoom2: ['', [Validators.required]]




   
  })

  this.firebaseService.lastaccess_project().subscribe(data => {

      this.projectsetupList = data.map(e => {
        return {
          id: e.payload.doc.id, 
          isEdit: false,
          Name: e.payload.doc.data()['Name'],          
          Address: e.payload.doc.data()['Address'],
          Type: e.payload.doc.data()['Type'], 
          Assigned: e.payload.doc.data()['Assigned'], 
          Foyer:  e.payload.doc.data()['Foyer'],
       CommonToilet:  e.payload.doc.data()['CommonToilet'],
      LivingRoom:  e.payload.doc.data()['LivingRoom'],
       Dining:  e.payload.doc.data()['Dining'],
        Kitchen: e.payload.doc.data()['Kitchen'],
         ServantsRoom:  e.payload.doc.data()['ServantsRoom'],
          MasterBedRoom: e.payload.doc.data()['MasterBedRoom'],
          BedRoom1: e.payload.doc.data()['BedRoom1'],
          BedRoom2: e.payload.doc.data()['BedRoom2']


        };
      })
      console.log("project--id",this.projectsetupList);
   


       
     
     
    });
  }

  AssetRecord() {

    console.log("v---->",this.projectsetupForm.value)
   console.log("record id ",this.currentId)

    this.AssetData=JSON.stringify(this.projectsetupForm.value)

     this.FAssetData= JSON.parse(this.AssetData)

     

     


    
this.record['Foyer'] = this.FAssetData.Foyer; 
    this.record['CommonToilet'] = this.FAssetData.CommonToilet;
    this.record['LivingRoom'] = this.FAssetData.LivingRoom;
    this.record['Dining'] = this.FAssetData.Dining;
    this.record['Kitchen'] = this.FAssetData.Kitchen;
    this.record['ServantsRoom'] = this.FAssetData.ServantsRoom;
    this.record['MasterBedRoom'] = this.FAssetData.MasterBedRoom;
    this.record['BedRoom1'] = this.FAssetData.BedRoom1;
    this.record['BedRoom2'] = this.FAssetData.BedRoom2;

    //this.record=this.record.isEdit = false;
    
    console.log("p---->",this.FAssetData.Dining);

    //this.firebaseService.update_project();
   
this.firebaseService.update_project( this.currentId, this.record);
this.projectsetupForm.reset();



 

    
    






    console.log("project asset -->",this.FAssetData.id);

    console.log ("form data ",this.projectsetupForm.value)
   console.log("jdasldjsl--",this.record)




     /* this.firebaseService.create_project(this.projectsetupForm.value).then(resp => {
     this.projectsetupForm.reset();

   })
   .catch(error => {
        console.log(error);
     });*/
  }
  

  RemoveRecord(rowID) {
   // this.firebaseService.delete_project(rowID);
  }

  EditRecord(record) {

    //record.isEdit = true;
   // record.EditName = record.Name;
    //record.EditAddress = record.Address;  
   // record.EditType = record.Type;
   // record.EditAssigned = record.Assigned;

  }

  UpdateRecord(recordRow) {

    //let record = {};

   // record['Name'] = recordRow.EditName;
    //record['Address'] = recordRow.EditAddress;
   // record['Type'] = recordRow.EditType;
   // record['Assigned'] = recordRow.EditAssigned;
   // this.firebaseService.update_project(recordRow.id, record);
   // recordRow.isEdit = false;

  }
 

  OnChange(event){
    alert("you have selected id  "+ event.target.value);

  }

 async confirmalert(){
   const alert = await this.alertCtrl.create({ 
      header: 'ADD More Project Assets',
      message: 'Do you want to ADD Project Assets?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
          this.router.navigate(['home']);
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          cssClass:'icon-color',
          handler: data => {
            this.router.navigate(['apartment-assignment']);
            //console.log('Items Removed!');
            //Call you API to remove Items here.
          }
        }
      ]
    });
   await alert.present();  
  }
  

}
