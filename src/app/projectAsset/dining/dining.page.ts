import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup, Validators, } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';

import { ToastController, LoadingController, Platform,AlertController } from "@ionic/angular";

import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Camera,CameraOptions} from '@ionic-native/camera/ngx';

//new
import { Papa } from 'ngx-papaparse';

import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage-angular';

import { StorageService } from 'src/app/services/storage.service';

import { EmailComposer } from '@ionic-native/email-composer/ngx';


interface StudentData {
  

            Doors_and_Windows:string;
               UPVC_utility_Bug_screen_windows_are_operable:string;
               UPVC_utility_Bug_screen_windows_are_operable_Photo: any;
              UPVC_utility_Bug_screen_windows_are_operable_Description:string;

               Hardware_is_consistent:string;
               Hardware_is_consistent_Photo: any;
              Hardware_is_consistent_Description:string;

              UPVC_utility_door_is_operable:string;
              UPVC_utility_door_is_operable_Photo: any;
              UPVC_utility_door_is_operable_Description:string;

               Gaskets_and_Sealants_are_intact:string;
               Gaskets_and_Sealants_are_intact_Photo: any;
              Gaskets_and_Sealants_are_intact_Description:string;
              
             UPVC_utility_bug_screen_mesh_is_taut:string;
              UPVC_utility_bug_screen_mesh_is_taut_Photo: any;
              UPVC_utility_bug_screen_mesh_is_taut_Description:string;

               UPVC_utility_door_is_free_of_sharp_edges:string;
               UPVC_utility_door_is_free_of_sharp_edges_Photo: any;
              UPVC_utility_door_is_free_of_sharp_edges_Description:string;
           
            Electrical:string;
               Switches_are_operable:string;
               Switches_are_operable_Photo: any;
              Switches_are_operable_Description:string;

               Switch_plates_are_aligned:string;
               Switch_plates_are_aligned_Photo: any;
              Switch_plates_are_aligned_Description:string;

               Electrical_ceiling_points_are_covered:string;
               Electrical_ceiling_points_are_covered_Photo: any;
              Electrical_ceiling_points_are_covered_Description:string;

               Electrical_points_are_as_per_standard_offering:string;
               Electrical_points_are_as_per_standard_offering_Photo: any;
              Electrical_points_are_as_per_standard_offering_Description:string;
              
               Electrical_wall_points_are_covered:string;
               Electrical_wall_points_are_covered_Photo: any;
              Electrical_wall_points_are_covered_Description:string;
           
            Walls_and_Ceiling:string;
               Finishing_of_granite_coping_on_ledges:string;
               Finishing_of_granite_coping_on_ledges_Photo: any;
              Finishing_of_granite_coping_on_ledges_Description:string;

              Ceilings_are_free_of_stains_or_undulations_or_cracks_etc:string;
Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Photo: any;
              Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description:string;

             Walls_around_door_free_of_stains_or_cracks_or_dampness:string;
            Walls_around_door_free_of_stains_or_cracks_or_dampness_Photo: any;
              Walls_around_door_free_of_stains_or_cracks_or_dampness_Description:string;

               Cornices_provided_are_aligned:string;
               Cornices_provided_are_aligned_Photo: any;
              Cornices_provided_are_aligned_Description:string;
  



  
   
}
@Component({
  selector: 'app-dining',
  templateUrl: './dining.page.html',
  styleUrls: ['./dining.page.scss'],
})
export class DiningPage implements OnInit {
  //new
  completiontime:any
flist:any;
flatnumber:any;
  au:any;
dateTime:any;
stdata:any;
arr:any[];
csvData:any;
issubmit:boolean;
idata:any;
AssetData:any;
DiningData:any;

isection:string;
recivedData:any;
data:any;
mypicref:any;
currentId:any[];

cameradisplay1:boolean;
cameradisplay2:boolean;
cameradisplay3:boolean;
cameradisplay4:boolean;
cameradisplay5:boolean;
cameradisplay6:boolean;
cameradisplay7:boolean;
cameradisplay8:boolean;
cameradisplay9:boolean;
cameradisplay10:boolean;
cameradisplay11:boolean;
cameradisplay12:boolean;
cameradisplay13:boolean;
cameradisplay14:boolean;
cameradisplay15:boolean;
cameradisplay16:boolean;
isSubmitted = false;
ionicForm: FormGroup;

inspectionList = []; 
inspectionData: StudentData;
inspectionForm : FormGroup;
isToggled:boolean;
imgURL1:any;
imgURL2:any;
imgURL3:any;
imgURL4:any;
imgURL5:any;
imgURL6:any;
imgURL7:any;
imgURL8:any;
imgURL9:any;
imgURL10:any;
imgURL11:any;
imgURL12:any;
imgURL13:any;
imgURL14:any;
imgURL15:any;
imgURL16:any;
imgURL17:any;
imgURL18:any;
imgURL19:any;
imgURL20:any;
imgURL21:any;
imgURL22:any;
imgURL23:any;
imgURL24:any;
imgURL25:any;
imgURL26:any;
imgURL27:any;
imgURL28:any;
imgURL29:any;
imgURL30:any;
imgURL31:any;
imgURL32:any;
imgURL33:any;
imgURL34:any;
imgURL35:any;
imgURL36:any;
imgURL37:any;
imgURL38:any;
imgURL39:any;
imgURL40:any;
imgURL41:any;
imgURL42:any;
imgURL43:any;
imgURL44:any;
imgURL45:any;
imgURL46:any;
imgURL47:any;
imgURL48:any;
imgURL49:any;
imgURL50:any;

isToggled1:boolean;
isToggled2:boolean;
isToggled3:boolean;
isToggled4:boolean;
isToggled5:boolean;
isToggled6:boolean;
isToggled7:boolean;
isToggled8:boolean;
isToggled9:boolean;
isToggled10:boolean;

record ={};



constructor(

 private Platform:Platform,
 private _cdr: ChangeDetectorRef,
 public http:HttpClient,
 private auth: AngularFireAuth,
 private route: ActivatedRoute, private router: Router,
 private afFirestore :AngularFirestore,
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
)
 {

   this.issubmit=false;
       
   this.isToggled1 = false;
    this.isToggled2 = false; 
    this.isToggled3 = false;
     this.isToggled4 = false;
      this.isToggled5 = false;
       this.isToggled6 = false;
    this.isToggled7 = false; 
    this.isToggled8 = false;
     this.isToggled9 = false;
      this.isToggled10 = false;
this.imgURL1='';
this.imgURL2='';
this.imgURL3='';
this.imgURL4='';
this.imgURL5='';
this.imgURL6='';
this.imgURL7='';
this.imgURL8='';
this.imgURL9='';
this.imgURL10='';
this.imgURL11='';
this.imgURL12='';
this.imgURL13='';
this.imgURL14='';
this.imgURL15='';
this.imgURL16='';
this.imgURL17='';
this.imgURL19='';
this.imgURL20='';
this.imgURL21='';
this.imgURL22='';
this.imgURL23='';
this.imgURL24='';
this.imgURL25='';
this.imgURL26='';
this.imgURL27='';
this.imgURL28='';
this.imgURL29='';
this.imgURL30='';
this.imgURL31='';
this.imgURL32='';
this.imgURL33='';
this.imgURL34='';
this.imgURL35='';
this.imgURL36='';
this.imgURL37='';
this.imgURL38='';
this.imgURL39='';
this.imgURL40='';
this.imgURL41='';
this.imgURL42='';
this.imgURL43='';
this.imgURL44='';
this.imgURL45='';
this.imgURL46='';
this.imgURL47='';
this.imgURL48='';
this.imgURL49='';
this.imgURL50='';
   
    this.cameradisplay1= false;
this.cameradisplay2= false;
this.cameradisplay3= false;
this.cameradisplay4= false;
this.cameradisplay5= false;
this.cameradisplay6 =false;   
this.cameradisplay7=false;
this.cameradisplay8=false;
this.cameradisplay9=false;
this.cameradisplay10=false;
this.cameradisplay11=false;
this.cameradisplay12=false;
this.cameradisplay13=false;
this.cameradisplay14=false;
this.cameradisplay15=false;
this.cameradisplay16=false;  


   console.log("1st--->",this.isToggled)

    this.inspectionData = {} as StudentData;
    
    this.mypicref=firebase.storage().ref('/')

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;        
        this.currentId=this.data.id;
        console.log("recived data @foyer page",this.data)     

        this.recivedData=this.data;   


      }
    });
   
  

   }

   

  ngOnInit() {
    //new
     firebase.auth().onAuthStateChanged(user => {
    if (user) {
     
      firebase
        .firestore()
        .doc(`/userProfile/${user.uid}`)
        .get()
        .then(userProfileSnapshot => {
         this.au= userProfileSnapshot.data()
         console.log("current user",this.au.email)

        });
    }
  });
    this.storage.create();
    const db =firebase.firestore();   

    db.collection("test1")
      .doc(this.recivedData)
      .get()
      .then(doc => {
    console.log("all",doc.data().Flat_Number) 
    this.flatnumber=doc.data().Flat_Number
      });
    

   //new

    this.ionicForm = this.formBuilder.group({

   

      
               Doors_and_Windows:['Header'],

               UPVC_utility_Bug_screen_windows_are_operable:['',[Validators.required]],
               UPVC_utility_Bug_screen_windows_are_operable_Photo: [this.imgURL1],
              UPVC_utility_Bug_screen_windows_are_operable_Description:[''],

               Hardware_is_consistent:[''],
               Hardware_is_consistent_Photo: [this.imgURL2],
              Hardware_is_consistent_Description:[''],

              UPVC_utility_door_is_operable:[''],
              UPVC_utility_door_is_operable_Photo: [this.imgURL3],
              UPVC_utility_door_is_operable_Description:[''],

               Gaskets_and_Sealants_are_intact:[''],
               Gaskets_and_Sealants_are_intact_Photo: [this.imgURL4],
              Gaskets_and_Sealants_are_intact_Description:[''],
              
             UPVC_utility_bug_screen_mesh_is_taut:[''],
              UPVC_utility_bug_screen_mesh_is_taut_Photo: [this.imgURL5],
              UPVC_utility_bug_screen_mesh_is_taut_Description:[''],

               UPVC_utility_door_is_free_of_sharp_edges:['',[Validators.required]],
               UPVC_utility_door_is_free_of_sharp_edges_Photo: [this.imgURL6],
              UPVC_utility_door_is_free_of_sharp_edges_Description:['' ],
           
            Electrical:['Header'],
               Switches_are_operable:['',[Validators.required]],
               Switches_are_operable_Photo: [this.imgURL7],
              Switches_are_operable_Description:[''],

               Switch_plates_are_aligned:[''],
               Switch_plates_are_aligned_Photo: [this.imgURL8],
              Switch_plates_are_aligned_Description:[''],

               Electrical_ceiling_points_are_covered:[''],
               Electrical_ceiling_points_are_covered_Photo: [this.imgURL9],
              Electrical_ceiling_points_are_covered_Description:[''],

               Electrical_points_are_as_per_standard_offering:[''],
               Electrical_points_are_as_per_standard_offering_Photo: [this.imgURL9],
              Electrical_points_are_as_per_standard_offering_Description:[''],
              
               Electrical_wall_points_are_covered:['',[Validators.required]],
               Electrical_wall_points_are_covered_Photo: [this.imgURL10],
              Electrical_wall_points_are_covered_Description:[''],
           
            Walls_and_Ceiling:['Header'],
               Finishing_of_granite_coping_on_ledges:['',[Validators.required]],
               Finishing_of_granite_coping_on_ledges_Photo: [this.imgURL11],
              Finishing_of_granite_coping_on_ledges_Description:[''],

              Ceilings_are_free_of_stains_or_undulations_or_cracks_etc:[''],
              Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Photo: [this.imgURL12],
              Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description:[''],

              Walls_around_door_free_of_stains_or_cracks_or_dampness:[''],
              Walls_around_door_free_of_stains_or_cracks_or_dampness_Photo: [this.imgURL13],
              Walls_around_door_free_of_stains_or_cracks_or_dampness_Description:[''],

               Cornices_provided_are_aligned:['',[Validators.required]],
               Cornices_provided_are_aligned_Photo: [this.imgURL14],
              Cornices_provided_are_aligned_Description:['']     
      
    })

     
  }
  
     //camer section
  





      getGallery1(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL1= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery2(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL2= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery3(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL3= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery4(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL4= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery5(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL5= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery6(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL6= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery7(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL7= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery8(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL8= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery9(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL9= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery10(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL10= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery11(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL11= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery12(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL12= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery13(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL13= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery14(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL14= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery15(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL15= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery16(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL16= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery17(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL17= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery18(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL18= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery19(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL19= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery20(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL20= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery21(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL21= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery22(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL22= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery23(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL23= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery24(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL24= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery25(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL25= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery26(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL26= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery27(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL27= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery28(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL28= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery29(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL29= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery30(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL30= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery31(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL31= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery32(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL32= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery33(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL33= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery34(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL34= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery35(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL35= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery36(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL36= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery37(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL37= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery38(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL38= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery39(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL39= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery40(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL40= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery41(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL41= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery42(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL42= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery43(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL43= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery44(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL44= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery45(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL45= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }
            getGallery46(){
      var options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((ref)=>{
          this.imgURL46= 'data:image/jpeg;base64,' + ref;

        }).catch(e=>{
          console.log(e)
        })     
      }


 // new code      





    //end camer

arrayToCSV(objArray) {
     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
     let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

     return array.reduce((str, next) => {
         str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
         return str;
        }, str);
 }

  
      
      
     starttime() {
        this.dateTime = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
         const db =firebase.firestore();
         const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
     const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
          var starttimeref = db.collection("test1").doc(this.recivedData); 

        
 starttimeref.update({

  Dining:arrayUnion({
      "start time": this.dateTime,
      "user":  this.au.email
      
       
     })
}).then(function() {
  console.log("starttime time is updated");
});


        console.log("enter time",this.dateTime)
        //return this.dateTime
    
    
     }

         
  
  sendmail(){ 


    this.storageService.getObject('Dining form csv').then(result => {
    if (result != null) {
    console.log('Dining form csv: '+ result);
    this.idata= result;
    }
    }).catch(e => {
    console.log('error: ', e);
    });
    let email = {
     to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      bcc: ['j.prajal@gmail,com'],
  
  attachments: [
    this.idata

  ],
  subject: 'Report',
  body: 'report from krafturspace app sent by'+ this.au +'for Flat number'+this.flatnumber + 'time of completion'+this.completiontime,
  isHtml: true
};

this.emailComposer.open(email);

  }

   
  

  submitForm() {
    this.issubmit=true;

     const db =firebase.firestore();
     const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
     const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
      let date = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

      this.completiontime=date;
      this.AssetData=JSON.stringify(this.ionicForm.value)   

     this.DiningData= JSON.parse(this.AssetData);



      this.arr=[this.DiningData]
console.log("arr1",this.arr )

this.stdata=this.arrayToCSV(this.arr) ;
   this.storageService.setObject('Dining form csv', this.stdata);

    this.storageService.getObject('Dining form csv').then(result => {
    if (result != null) {
    console.log('Dining form csv: '+ result);
    }
    }).catch(e => {
    console.log('error: ', e);
    });


    var addtimeref = db.collection("test1").doc(this.recivedData); 

// Atomically add a new region to the "regions" array field.
 addtimeref.update({
  Dining:arrayUnion({
      "end time": date
      
       
     })
}).then(function() {
  console.log("end time is updated");
});




var washingtonRef = db.collection("test1").doc(this.recivedData); 

// Atomically add a new region to the "regions" array field.
washingtonRef.update({
  Dining:arrayUnion({
       "Diningu": this.DiningData
      
       
     })
}).then(function() {
  console.log("dining data is  updated");
});




  }

    


   //new end

   


               UPVC_utility_Bug_screen_windows_are_operable(): void {      
    let Qvalue = this.ionicForm.get('UPVC_utility_Bug_screen_windows_are_operable').value;
    this.starttime();
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
    }

    this._cdr.detectChanges();  
    
  }
           

               Hardware_is_consistent(): void {      
    let Qvalue = this.ionicForm.get('Hardware_is_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay2 =true;

    }else{
      this.cameradisplay2 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
              UPVC_utility_door_is_operable(): void {      
    let Qvalue = this.ionicForm.get('UPVC_utility_door_is_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay3 =true;

    }else{
      this.cameradisplay3 =false;
    }

    this._cdr.detectChanges();  
    
  }
             

               Gaskets_and_Sealants_are_intact(): void {      
    let Qvalue = this.ionicForm.get('Gaskets_and_Sealants_are_intact').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay4 =true;

    }else{
      this.cameradisplay4 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
              
             UPVC_utility_bug_screen_mesh_is_taut(): void {      
    let Qvalue = this.ionicForm.get('UPVC_utility_bug_screen_mesh_is_taut').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay5=true;

    }else{
      this.cameradisplay5=false;
    }

    this._cdr.detectChanges();  
    
  }
              

               UPVC_utility_door_is_free_of_sharp_edges(): void {      
    let Qvalue = this.ionicForm.get('UPVC_utility_door_is_free_of_sharp_edges').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay6 =true;

    }else{
      this.cameradisplay6 =false;
    }

    this._cdr.detectChanges();  
    
  }
           
            

               Switches_are_operable(): void {      
    let Qvalue = this.ionicForm.get('Switches_are_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay7 =true;

    }else{
      this.cameradisplay7 =false;
    }

    this._cdr.detectChanges();  
    
  }
             

               Switch_plates_are_aligned(): void {      
    let Qvalue = this.ionicForm.get('Switch_plates_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay8 =true;

    }else{
      this.cameradisplay8 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Electrical_ceiling_points_are_covered(): void {      
    let Qvalue = this.ionicForm.get('Electrical_ceiling_points_are_covered').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay9 =true;

    }else{
      this.cameradisplay9 =false;
    }

    this._cdr.detectChanges();  
    
  }
            
               Electrical_points_are_as_per_standard_offering(): void {      
    let Qvalue = this.ionicForm.get('Electrical_points_are_as_per_standard_offering').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay10 =true;

    }else{
      this.cameradisplay10 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
              
               Electrical_wall_points_are_covered(): void {      
    let Qvalue = this.ionicForm.get('Electrical_wall_points_are_covered').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay11 =true;

    }else{
      this.cameradisplay11 =false;
    }

    this._cdr.detectChanges();  
    
  }
            
           
           
               Finishing_of_granite_coping_on_ledges(): void {      
    let Qvalue = this.ionicForm.get('Finishing_of_granite_coping_on_ledges').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay12 =true;

    }else{
      this.cameradisplay12 =false;
    }

    this._cdr.detectChanges();  
    
  }
              

              Ceilings_are_free_of_stains_or_undulations_or_cracks_etc(): void {      
    let Qvalue = this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay13 =true;

    }else{
      this.cameradisplay13 =false;
    }

    this._cdr.detectChanges();  
    
  }
             

             Walls_around_door_free_of_stains_or_cracks_or_dampness(): void {      
    let Qvalue = this.ionicForm.get('Walls_around_door_free_of_stains_or_cracks_or_dampness').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay14 =true;

    }else{
      this.cameradisplay14 =false;
    }

    this._cdr.detectChanges();  
    
  }
            

               Cornices_provided_are_aligned(): void {      
    let Qvalue = this.ionicForm.get('Cornices_provided_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay15 =true;

    }else{
      this.cameradisplay15 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
   

 notify1() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled1){
    console.log("true")
    this.isToggled1=false;

  }else{
    console.log("flase")
     this.isToggled1=true;

  }
   this._cdr.detectChanges();
   

} 
notify2() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled2){
    console.log("true")
    this.isToggled2=false;

  }else{
    console.log("flase")
     this.isToggled2=true;

  }
   this._cdr.detectChanges();
   

}





  
notify3() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled3){
    console.log("true")
    this.isToggled3=false;

  }else{
    console.log("flase")
     this.isToggled3=true;

  }
   this._cdr.detectChanges();
   

}

}

