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
               UPVC_window_bug_screen_mesh_is_operable:string;
                UPVC_window_bug_screen_mesh_is_operable_Photo: any;
              UPVC_window_bug_screen_mesh_is_operable_Description:string;

               Door_color_is_consistent:string;
                Door_color_is_consistent_Photo: any;
              Door_color_is_consistent_Description:string;

             Gaskets_or_sealents_are_intact:string;
              Gaskets_or_sealents_are_intact_Photo: any;
              Gaskets_or_sealents_are_intact_Description:string;

               UPVC_window_screen_mesh_is_taut:string;
                UPVC_window_screen_mesh_is_taut_Photo: any;
              UPVC_window_screen_mesh_is_taut_Description:string;

               UPVC_hardware_is_standard:string;
                UPVC_hardware_is_standard_Photo: any;
              UPVC_hardware_is_standard_Description:string;

               UPVC_window_glass_is_free_of_scratches:string;
                UPVC_window_glass_is_free_of_scratches_Photo: any;
              UPVC_window_glass_is_free_of_scratches_Description:string;

               UPVC_windows_are_operable:string;
                UPVC_windows_are_operable_Photo: any;
              UPVC_windows_are_operable_Description:string;

               Door_stopper_doesnt_damage_wooden_flooring:string;               
                Door_stopper_doesnt_damage_wooden_flooring_Photo: any;
              Door_stopper_doesnt_damage_wooden_flooring_Description:string;

               Door_frame_and_shutter_gaps_are_consistent:string;
                Door_frame_and_shutter_gaps_are_consistent_Photo: any;
              Door_frame_and_shutter_gaps_are_consistent_Description:string;

               Hardware_is_as_per_standard_offering:string;
                Hardware_is_as_per_standard_offering_Photo: any;
              Hardware_is_as_per_standard_offering_Description:string;

               Door_frame_is_consistent_without_dent_or_scratches_or_marks:string;
                Door_frame_is_consistent_without_dent_or_scratches_or_marks_Photo: any;
              Door_frame_is_consistent_without_dent_or_scratches_or_marks_Description:string;
        
            Electrical:string;
               Switches_are_operable:string;
                Switches_are_operable_Photo: any;
              Switches_are_operable_Description:string;

             Electrical_points_are_as_per_standard_offering:string;
              Electrical_points_are_as_per_standard_offering_Photo: any;
              Electrical_points_are_as_per_standard_offering_Description:string;

               Switch_plates_are_aligned:string;
                Switch_plates_are_aligned_Photo: any;
              Switch_plates_are_aligned_Description:string;

             AC_Core_cut_pipe_is_finished_flush_with_plaster:string;
              AC_Core_cut_pipe_is_finished_flush_with_plaster_Photo: any;
              AC_Core_cut_pipe_is_finished_flush_with_plaster_Description:string;

               AC_Core_cut_pipe_is_cleaned :string;
                AC_Core_cut_pipe_is_cleaned_Photo: any;
              AC_Core_cut_pipe_is_cleaned_Description:string;

               Ceiling_electrical_points_are_covered_or_capped_properly:string;
                Ceiling_electrical_points_are_covered_or_capped_properly_Photo: any;
              Ceiling_electrical_points_are_covered_or_capped_properly_Description:string;

               Wall_Light_points_are_covered__or_capped_properly:string;
                Wall_Light_points_are_covered__or_capped_properly_Photo: any;
              Wall_Light_points_are_covered__or_capped_properly_Description:string;
            
            Flooring:string;

               Wooden_flooring_is_fixed_and_consistent:string;
                Wooden_flooring_is_fixed_and_consistent_Photo: any;
              Wooden_flooring_is_fixed_and_consistent_Description:string;
              
             Skirting_finish_and_alignment:string;
              Skirting_finish_and_alignment_Photo: any;
              Skirting_finish_and_alignment_Description:string;

             Transition_betweeen_wooden_flooring_and_toilet:string;
              Transition_betweeen_wooden_flooring_and_toilet_Photo: any; 
              Transition_betweeen_wooden_flooring_and_toilet_Description:string;

               Transition_betweeen_Corridor_marble_and_wooden_flooring:string;
                Transition_betweeen_Corridor_marble_and_wooden_flooring_Photo: any;
              Transition_betweeen_Corridor_marble_and_wooden_flooring_Description:string;
            
            Walls_and_ceiling:string;

               Cornices_provided_are_aligned:string;
                Cornices_provided_are_aligned_Photo: any;
              Cornices_provided_are_aligned_Description:string;

               Ceilings_are_free_of_stainss_or_undulations_or_stains_etc:string;
                Ceilings_are_free_of_stainss_or_undulations_or_stains_etc_Photo: any;
              Ceilings_are_free_of_stainss_or_undulations_or_stains_etc_Description:string;

               Walls_are_free_of_cracks_or_stains_etc:string;
                Walls_are_free_of_cracks_or_stains_etc_Photo: any;
              Walls_are_free_of_cracks_or_stains_etc_Description:string;
  



  
   
}


@Component({
  selector: 'app-bedroom3',
  templateUrl: './bedroom3.page.html',
  styleUrls: ['./bedroom3.page.scss'],
})
export class Bedroom3Page implements OnInit {
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
cameradisplay17:boolean;
cameradisplay18:boolean;
cameradisplay19:boolean;
cameradisplay20:boolean;
cameradisplay21:boolean;
cameradisplay22:boolean;
cameradisplay23:boolean;
cameradisplay24:boolean;
cameradisplay25:boolean;
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
this.cameradisplay17=false;
this.cameradisplay18=false;
this.cameradisplay19=false;
this.cameradisplay20=false;
this.cameradisplay21=false;
this.cameradisplay22=false;
this.cameradisplay23=false;
this.cameradisplay24=false;
this.cameradisplay25=false;
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

      
                Doors_and_Windows:[''],
               UPVC_window_bug_screen_mesh_is_operable:['',[Validators.required]],
                UPVC_window_bug_screen_mesh_is_operable_Photo: [this.imgURL1],
              UPVC_window_bug_screen_mesh_is_operable_Description:[''],

               Door_color_is_consistent:[''],
                Door_color_is_consistent_Photo: [this.imgURL2],
              Door_color_is_consistent_Description:[''],

              Gaskets_or_sealents_are_intact:[''],
              Gaskets_or_sealents_are_intact_Photo: [this.imgURL3],
              Gaskets_or_sealents_are_ntact_Description:[''],

               UPVC_window_screen_mesh_is_taut:[''],
                UPVC_window_screen_mesh_is_taut_Photo: [this.imgURL4],
              UPVC_window_screen_mesh_is_taut_Description:[''],

               UPVC_hardware_is_standard:[''],
                UPVC_hardware_is_standard_Photo: [this.imgURL5],
              UPVC_hardware_is_standard_Description:[''],

               UPVC_window_glass_is_free_of_scratches:[''],
                UPVC_window_glass_is_free_of_scratches_Photo: [this.imgURL6],
              UPVC_window_glass_is_free_of_scratches_Description:[''],

               UPVC_windows_are_operable:[''],
                UPVC_windows_are_operable_Photo: [this.imgURL7],
              UPVC_windows_are_operable_Description:[''],

               Door_stopper_doesnt_damage_wooden_flooring:[''],               
                Door_stopper_doesnt_damage_wooden_flooring_Photo: [this.imgURL8],
              Door_stopper_doesnt_damage_wooden_flooring_Description:[''],

               Door_frame_and_shutter_gaps_are_consistent:[''],
                Door_frame_and_shutter_gaps_are_consistent_Photo: [this.imgURL9],
              Door_frame_and_shutter_gaps_are_consistent_Description:[''],

               Hardware_is_as_per_standard_offering:[''],
                Hardware_is_as_per_standard_offering_Photo: [this.imgURL10],
              Hardware_is_as_per_standard_offering_Description:[''],

               Door_frame_is_consistent_without_dent_or_scratches_or_marks:['',[Validators.required]],
                Door_frame_is_consistent_without_dent_or_scratches_or_marks_Photo: [this.imgURL11],
              Door_frame_is_consistent_without_dent_or_scratches_or_marks_Description:[''],
          
            Electrical:[''],
               Switches_are_operable:['',[Validators.required]],
                Switches_are_operable_Photo: [this.imgURL12],
              Switches_are_operable_Description:[''],

             Electrical_points_are_as_per_standard_offering:[''],
            Electrical_points_are_as_per_standard_offering_Photo: [this.imgURL13],
              Electrical_points_are_as_per_standard_offering_Description:[''],

               Switch_plates_are_aligned:[''],
                Switch_plates_are_aligned_Photo: [this.imgURL14],
              Switch_plates_are_aligned_Description:[''],

              AC_Core_cut_pipe_is_finished_flush_with_plaster:[''],
              AC_Core_cut_pipe_is_finished_flush_with_plaster_Photo: [this.imgURL15],
              AC_Core_cut_pipe_is_finished_flush_with_plaster_Description:[''],

               AC_Core_cut_pipe_is_cleaned :[''],
                AC_Core_cut_pipe_is_cleaned_Photo: [this.imgURL16],
              AC_Core_cut_pipe_is_cleaned_Description:[''],

               Ceiling_electrical_points_are_covered_or_capped_properly:[''],
                Ceiling_electrical_points_are_covered_or_capped_properly_Photo: [this.imgURL17],
              Ceiling_electrical_points_are_covered_or_capped_properly_Description:[''],

               Wall_Light_points_are_covered__or_capped_properly:['',[Validators.required]],
                Wall_Light_points_are_covered__or_capped_properly_Photo: [this.imgURL18],
              Wall_Light_points_are_covered__or_capped_properly_Description:[''],
            
            Flooring:[''],

               Wooden_flooring_is_fixed_and_consistent:['',[Validators.required]],
                Wooden_flooring_is_fixed_and_consistent_Photo: [this.imgURL19],
              Wooden_flooring_is_fixed_and_consistent_Description:[''],

              Skirting_finish_and_alignment:[''],
              Skirting_finish_and_alignment_Photo: [this.imgURL20],
              Skirting_finish_and_alignment_Description:[''],

              Transition_betweeen_wooden_flooring_and_toilet:[''],
              Transition_betweeen_wooden_flooring_and_toilet_Photo: [this.imgURL21], 
              Transition_betweeen_wooden_flooring_and_toilet_Description:[''],

               Transition_betweeen_Corridor_marble_and_wooden_flooring:['',[Validators.required]],
                Transition_betweeen_Corridor_marble_and_wooden_flooring_Photo: [this.imgURL22],
              Transition_betweeen_Corridor_marble_and_wooden_flooring_Description:[''],
            
            Walls_and_ceiling:[''],

               Cornices_provided_are_aligned:['',[Validators.required]],
                Cornices_provided_are_aligned_Photo: [this.imgURL23],
              Cornices_provided_are_aligned_Description:[''],

               Ceilings_are_free_of_stainss_or_undulations_or_stains_etc:[''],
                Ceilings_are_free_of_stainss_or_undulations_or_stains_etc_Photo: [this.imgURL24],
                Ceilings_are_free_of_stainss_or_undulations_or_stains_etc_Description:[''],

               Walls_are_free_of_cracks_or_stains_etc:['',[Validators.required]],
                Walls_are_free_of_cracks_or_stains_etc_Photo: [this.imgURL25],
              Walls_are_free_of_cracks_or_stains_etc_Description:['']


      
     
      
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


    this.storageService.getObject('bedroom3 form csv').then(result => {
    if (result != null) {
    console.log('bedroom3 form csv: '+ result);
    this.idata= result;
    }
    }).catch(e => {
    console.log('error: ', e);
    });
    let email = {
     to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      
  
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
   this.storageService.setObject('bedroom3 form csv', this.stdata);

   


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
       "bedroom3u": this.DiningData
      
       
     })
}).then(function() {
  console.log("bedroom3 data is  updated");
});




  }

    


   //new end

   




   
               UPVC_window_bug_screen_mesh_is_operable():void {      
    let Qvalue = this.ionicForm.get('UPVC_window_bug_screen_mesh_is_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
    }

    this._cdr.detectChanges();  
    
  }
              

               Door_color_is_consistent():void {      
    let Qvalue = this.ionicForm.get('DB_is_fixed_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay2 =true;

    }else{
      this.cameradisplay2 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
              Gaskets_or_sealents_are_intact():void {      
    let Qvalue = this.ionicForm.get('Gaskets_or_sealents_are_intact').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay3 =true;

    }else{
      this.cameradisplay3 =false;
    }

    this._cdr.detectChanges();  
    
  }
             
               UPVC_window_screen_mesh_is_taut():void {      
    let Qvalue = this.ionicForm.get('UPVC_window_screen_mesh_is_taut').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay4 =true;

    }else{
      this.cameradisplay4 =false;
    }

    this._cdr.detectChanges();  
    
  }
                
               UPVC_hardware_is_standard():void {      
    let Qvalue = this.ionicForm.get('UPVC_hardware_is_standard').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay5 =true;

    }else{
      this.cameradisplay5 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               UPVC_window_glass_is_free_of_scratches():void {      
    let Qvalue = this.ionicForm.get('UPVC_window_glass_is_free_of_scratches').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay6 =true;

    }else{
      this.cameradisplay6 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               UPVC_windows_are_operable():void {      
    let Qvalue = this.ionicForm.get('UPVC_windows_are_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay7 =true;

    }else{
      this.cameradisplay7 =false;
    }
    
  }
               

               Door_stopper_doesnt_damage_wooden_flooring():void {      
    let Qvalue = this.ionicForm.get('Door_stopper_doesnt_damage_wooden_flooring').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay8 =true;

    }else{
      this.cameradisplay8 =false;
    }

    this._cdr.detectChanges();  
    
  }               
              
               Door_frame_and_shutter_gaps_are_consistent():void {      
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_gaps_are_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay9 =true;

    }else{
      this.cameradisplay9 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Hardware_is_as_per_standard_offering():void {      
    let Qvalue = this.ionicForm.get(' Hardware_is_as_per_standard_offering').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay10=true;

    }else{
      this.cameradisplay10 =false;
    }

    this._cdr.detectChanges();  
    
  }

               Door_frame_is_consistent_without_dent_or_scratches_or_marks():void {      
    let Qvalue = this.ionicForm.get('Door_frame_is_consistent_without_dent_or_scratches_or_marks').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay11 =true;

    }else{
      this.cameradisplay11 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
           
               Switches_are_operable():void {      
    let Qvalue = this.ionicForm.get(' Switches_are_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay12 =true;

    }else{
      this.cameradisplay12 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
             Electrical_points_are_as_per_standard_offering():void {      
    let Qvalue = this.ionicForm.get('Electrical_points_are_as_per_standard_offering').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay13 =true;

    }else{
      this.cameradisplay13 =false;
    }

    this._cdr.detectChanges();  
    
  }
           
               Switch_plates_are_aligned():void {      
    let Qvalue = this.ionicForm.get('Switch_plates_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay14 =true;

    }else{
      this.cameradisplay14 =false;
    }

    this._cdr.detectChanges();  
    
  }
             

              AC_Core_cut_pipe_is_finished_flush_with_plaster():void {      
    let Qvalue = this.ionicForm.get(' AC_Core_cut_pipe_is_finished_flush_with_plaster').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay15 =true;

    }else{
      this.cameradisplay15 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
               AC_Core_cut_pipe_is_cleaned ():void {      
    let Qvalue = this.ionicForm.get('AC_Core_cut_pipe_is_cleaned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay16 =true;

    }else{
      this.cameradisplay16 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Ceiling_electrical_points_are_covered_or_capped_properly():void {      
    let Qvalue = this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay17 =true;

    }else{
      this.cameradisplay17 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Wall_Light_points_are_covered__or_capped_properly():void {      
    let Qvalue = this.ionicForm.get(' Wall_Light_points_are_covered__or_capped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay18 =true;

    }else{
      this.cameradisplay18 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
           

               Wooden_flooring_is_fixed_and_consistent():void {      
    let Qvalue = this.ionicForm.get('Wooden_flooring_is_fixed_and_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay19 =true;

    }else{
      this.cameradisplay19 =false;
    }

    this._cdr.detectChanges();  
    
  }
             
              Skirting_finish_and_alignment():void {      
    let Qvalue = this.ionicForm.get('Skirting_finish_and_alignment').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay20 =true;

    }else{
      this.cameradisplay20 =false;
    }

    this._cdr.detectChanges();  
    
  }
             

              Transition_betweeen_wooden_flooring_and_toilet():void {      
    let Qvalue = this.ionicForm.get('Transition_betweeen_wooden_flooring_and_toilet').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay21 =true;

    }else{
      this.cameradisplay21 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
               Transition_betweeen_Corridor_marble_and_wooden_flooring():void {      
    let Qvalue = this.ionicForm.get('Transition_betweeen_Corridor_marble_and_wooden_flooring').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay22 =true;

    }else{
      this.cameradisplay22 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
            

               Cornices_provided_are_aligned():void {      
    let Qvalue = this.ionicForm.get('Cornices_provided_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay23 =true;

    }else{
      this.cameradisplay23 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Ceilings_are_free_of_stainss_or_undulations_or_stains_etc():void {      
    let Qvalue = this.ionicForm.get('Ceilings_are_free_of_stainss_or_undulations_or_stains_etc').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay24 =true;

    }else{
      this.cameradisplay24=false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Walls_are_free_of_cracks_or_stains_etc():void {      
    let Qvalue = this.ionicForm.get('Walls_are_free_of_cracks_or_stains_etc').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay25 =true;

    }else{
      this.cameradisplay25 =false;
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
notify4() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled4){
    console.log("true")
    this.isToggled4=false;

  }else{
    console.log("flase")
     this.isToggled4=true;

  }
   this._cdr.detectChanges();
   

}

}
