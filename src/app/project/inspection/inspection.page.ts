import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ToastController, LoadingController, Platform, AlertController } from "@ionic/angular";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import {NavparamService} from 'src/app/services/navparam.service';


interface StudentData {
  Name: string;
  Address: string;
  Type:any;
  Assigned:string; 
   Flat_Number:string;  
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
  selector: 'app-inspection',
  templateUrl: './inspection.page.html',
  styleUrls: ['./inspection.page.scss'],
})
export class InspectionPage implements OnInit {
  public inspectlist:any[];

  public inspectuser:any;
  public nlist:any[];
  public userProfile: UserProfile;
  public isAdmin;
  public appuser:string;
  public ustr :string;
  public ug:string;
  public au:any
  public inspectl:any;
  inspectlistData: StudentData ;
  inspectlistForm : FormGroup;

  constructor(
    private authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private platform: Platform,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
     private  NavparamService: NavparamService,
    
  ) { 

    this.inspectlistData = {} as StudentData;
  }

  ngOnInit() {

    


        this.inspectlistForm = this.fb.group({

          Name: ['', [Validators.required]],
          Address: ['', [Validators.required]],
          Type: ['', [Validators.required]],
          Assigned: ['', [Validators.required]],
          Flat_Number: ['', [Validators.required]]

      
      })

      const db =firebase.firestore();    
  
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          db.doc(`/userProfile/${user.uid}`)
            .get()
            .then(userProfileSnapshot => {
              this.au = userProfileSnapshot.data()
            
              console.log("au----",this.au.email)
              let ustr1 =this.au.email;
              this.appuser= user.email;  

             this.inspectlist=[];
             this.inspectuser=[];
             
             db.collection('test1').where('Assigned','==', ustr1).get().then((snapshot)=>{
             //console.log("snapshot----->",snapshot.docs);
             snapshot.docs.forEach(doc => {     


             console.log("snapshort--",doc.data());
             console.log("currentid -->",doc.id)
             this.inspectuser.push(doc.id)
             
             this.inspectlist.push(doc.data());
             

             console.log("collected list--->",this.inspectlist)
             console.log("collection doc list",this.inspectuser)
          
           
             });
            })
          });

        }
      })
 
      
  }


  inspect(item,index){  

    console.log( "current in-->",index)
   
    let senddata:any[]=this.inspectuser[index];
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata
             
                  
            }  
      };
      this.router.navigate(['inspect-detail'],navigationExtras);
      }

}



