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
  Electrical:string;

  Electrical_wall_and_ceiling_points_are_covered :string;  
  Electrical_wall_and_ceiling_points_are_covered_Photo: any;
  Electrical_wall_and_ceiling_points_are_covered_Description:string;

  Electrical_ceiling_points_are_covered : string;
  Electrical_ceiling_points_are_covered_Photo: any;
  Electrical_ceiling_points_are_covered_Description:string;

  Electrical_points_are_as_per_standard_offering : string;
  Electrical_points_are_as_per_standard_offering_Photo: any;
  Electrical_points_are_as_per_standard_offering_Description:string;

  Switches_are_operable : string;
  Switches_are_operable_Photo: any;
  Switches_are_operable_Description:string;

  Switch_plates_are_aligned: string;
  Switch_plates_are_aligned_Photo: any;
  Switch_plates_are_aligned_Description:string;

  DB_and_Communication_boxes_are_fixed_properly : string;
  DB_and_Communication_boxes_are_fixed_properly_Photo: any;
  DB_and_Communication_boxes_are_fixed_properly_Description:string;

  Exterior_Surface:string;
  External_false_ceiling_finish_over_main_door_is_correct:string;
  External_false_ceiling_finish_over_main_door_is_correct_Photo: any;
  External_false_ceiling_finish_over_main_door_is_correct_Description:string;

  Walls_around_door_free_of_stains_or_cracks_or_dampness:string;
  Walls_around_door_free_of_stains_or_cracks_or_dampness_Photo: any;
  Walls_around_door_free_of_stains_or_cracks_or_dampness_Description:string;

  Main_Door:string;
            Gaskets_sealants_are_intact:string;
            Gaskets_sealants_are_intact_Photo:any;
            Gaskets_ealants_are_intact_Description:string;

            door_opens_And_closes_properly:string;
            door_opens_And_closes_properly_Photo:any;
            door_opens_And_closes_properly_Photo_Description:string;

            Finishing_around_the_hardware:string;
            Finishing_around_the_hardware_Photo:any;
            Finishing_around_the_hardware_Description:string;

            Architrave_is_consistent:string;
            Architrave_is_consistent_Photo:any;
            Architrave_is_consistent_Description:string;

            Door_frame_and_shutter_shades_are_consistent:string;
            Dents_marks_on_Main_door_shutter_Photo:any;
            Dents_marks_on_Main_door_shutter_Description:string;

            Shutter_is_aligned_when_shut_from_both_sides:string; 
            Internal_and_external_shutter_alignments_Photo:any;
            Internal_and_external_shutter_alignments_Description:string;

            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks:string;
            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks_Photo: any;
            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks_Description:string;

            Hardware_is_as_per_standard_offering:string;
            Hardware_is_as_per_standard_offering_Photo:any;
            Hardware_is_as_per_standard_offering_Description:string;

            Lock_is_functional_from_both_sides:string;
            Lock_is_functional_from_both_sides_Photo:any;
            Lock_is_functional_from_both_sides_Description:string;

            Door_frame_and_wall_junctions_are_sealed:string;
            Door_frame_and_wall_junctions_are_sealed_Photo:any;
            Door_frame_and_wall_junctions_are_sealed_Description:string;

            Shade_variations_in_shutters:string;
            Shade_variations_in_shutters_Photo:any;
            Shade_variations_in_shutters_Description:string;

Miscellaneous:string;
           Granite_ledge_provided_is_free_of_cracks_and_sharp_edges:string;
           Granite_ledge_provided_is_free_of_cracks_and_sharp_edges_Photo:any;
            Granite_ledge_provided_is_free_of_cracks_and_sharp_edges_Description:string;

Video_Door_Phone:string;
            Video_door_phone_is_functional:string;
            Video_door_phone_is_functional_Photo:any;
            Video_door_phone_is_functional_Description:string;

            Video_door_phone_alignment_is_right:string;            
            Video_door_phone_alignment_is_right_Photo:any;
            Video_door_phone_alignment_Description:string;

            Video_door_phone_is_fixed:string;
           Video_door_phone_is_fixed_Photo:any;
            Video_door_phone_is_fixed_Description:string;
        
 Walls_and_Ceiling:string;
 Ceiling_is_free_of_undulations:string;
 Ceiling_is_free_of_undulations_Photo: any;
 Ceiling_is_free_of_undulations_Description:string;

 Walls_are_free_of_stains_undulations_or_cracks_or_dampness:string
 Walls_are_free_of_stains_undulations_or_cracks_or_dampness_Photo:any;
 Walls_are_free_of_stains_undulations_or_cracks_dampness_Description:string;  
            
   
}

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.page.html',
  styleUrls: ['./foyer.page.scss'],
})
export class FoyerPage implements OnInit {

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


endtime:any;  
imgURL:any;
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
cameradisplay26:boolean;








isSubmitted = false;
ionicForm: FormGroup;

inspectionList = []; 
inspectionData: StudentData;
inspectionForm : FormGroup;
isToggled:boolean;
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
   this.isToggled = false;    
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




this.cameradisplay1=false;
this.cameradisplay2=false;
this.cameradisplay3=false;
this.cameradisplay4=false;
this.cameradisplay5=false;
this.cameradisplay6=false;
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
this.cameradisplay26=false;

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

        Electrical:[''],

        Electrical_wall_and_ceiling_points_are_covered : ['',[Validators.required]],
        Electrical_wall_and_ceiling_points_are_covered_Photo: [this.imgURL1],
        Electrical_wall_and_ceiling_points_are_covered_Description: [''],

        Electrical_ceiling_points_are_covered :[''],
        Electrical_ceiling_points_are_covered_Photo: [this.imgURL2],
        Electrical_ceiling_points_are_covered_Description: [''],

        Electrical_points_are_as_per_standard_offering : [''],
        Electrical_points_are_as_per_standard_offering_Photo: [this.imgURL3],
        Electrical_points_are_as_per_standard_offering_Description:[''],

        Switches_are_operable : [''],
        Switches_are_operable_Photo: [this.imgURL4],
        Switches_are_operable_Description:[''],


        Switch_plates_are_aligned: [''],
        Switch_plates_are_aligned_Photo: [this.imgURL5],
        Switch_plates_are_aligned_Description:[''],


        DB_and_Communication_boxes_are_fixed_properly : ['',[Validators.required]],
        DB_and_Communication_boxes_are_fixed_properly_Photo: [this.imgURL6],
        DB_and_Communication_boxes_are_fixed_properly_Description:[''],


        Exterior_Surface:[''],
  External_false_ceiling_finish_over_main_door_is_correct: ['',[Validators.required]],
  External_false_ceiling_finish_over_main_door_is_correct_Photo:[this.imgURL7],
  External_false_ceiling_finish_over_main_door_is_correct_Description: [''],

  Walls_around_door_free_of_stains_or_cracks_or_dampness: [''],
  Walls_around_door_free_of_stains_or_cracks_or_dampness_Photo:[this.imgURL8],
  Walls_around_door_free_of_stains_or_cracks_or_dampness_Description: [''],

  Main_Door:[''],
            Gaskets_sealants_are_intact: ['',[Validators.required]],
            Gaskets_sealants_are_intact_Photo:[this.imgURL9],
            Gaskets_ealants_are_intact_Description: [''],

           door_opens_And_closes_properly: [''],
            door_opens_And_closes_properly_Photo:[this.imgURL10],
            door_opens_And_closes_properly_Photo_Description: [''],

            Finishing_around_the_hardware: [''],
            Finishing_around_the_hardware_Photo:[this.imgURL11],
            Finishing_around_the_hardware_Description: [''],

            Architrave_is_consistent: [''],
            Architrave_is_consistent_Photo:[this.imgURL12],
            Architrave_is_consistent_Description: [''],

            Door_frame_and_shutter_shades_are_consistent: [''],
            Dents_marks_on_Main_door_shutter_Photo:[this.imgURL13],
            Dents_marks_on_Main_door_shutter_Description: [''],

            Shutter_is_aligned_when_shut_from_both_sides: [''],
            Internal_and_external_shutter_alignments_Photo:[this.imgURL14],
            Internal_and_external_shutter_alignments_Description: [''],

            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks: [''],
            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks_Photo: [this.imgURL14],
            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks_Description: [''],

            Hardware_is_as_per_standard_offering: [''],
            Hardware_is_as_per_standard_offering_Photo:[this.imgURL15],
            Hardware_is_as_per_standard_offering_Description: [''],

            Lock_is_functional_from_both_sides: [''],
            Lock_is_functional_from_both_sides_Photo:[this.imgURL16],
            Lock_is_functional_from_both_sides_Description: [''],

            Door_frame_and_wall_junctions_are_sealed: [''],
            Door_frame_and_wall_junctions_are_sealed_Photo:[this.imgURL17],
            Door_frame_and_wall_junctions_are_sealed_Description: [''],

            Shade_variations_in_shutters: ['',[Validators.required]],
            Shade_variations_in_shutters_Photo:[this.imgURL18],
            Shade_variations_in_shutters_Description: [''],
Miscellaneous:[''],
           Granite_ledge_provided_is_free_of_cracks_and_sharp_edges: ['',[Validators.required]],
           Granite_ledge_provided_is_free_of_cracks_and_sharp_edges_Photo:[this.imgURL19],
            Granite_ledge_provided_is_free_of_cracks_and_sharp_edges_Description: [''],

Video_Door_Phone:[''],
            Video_door_phone_is_functional: ['',[Validators.required]],
            Video_door_phone_is_functional_Photo:[this.imgURL20],
            Video_door_phone_is_functional_Description: [''],

            
            Video_door_phone_alignment_is_right: [''],
            Video_door_phone_alignment_is_right_Photo:[this.imgURL21],
            Video_door_phone_alignment_is_right_Description: [''],

            Video_door_phone_is_fixed: [''],
           Video_door_phone_is_fixed_Photo:[this.imgURL22],
            Video_door_phone_is_fixed_Description: [''],
        
 Walls_and_Ceiling:[''],
 Ceiling_is_free_of_undulations: [''],
 Ceiling_is_free_of_undulations_Photo: [this.imgURL23],
 Ceiling_is_free_of_undulations_Description: [''],

 Walls_are_free_of_stains_undulations_or_cracks_or_dampness: ['',[Validators.required]],
 Walls_are_free_of_stains_undulations_or_cracks_or_dampness_Photo:[this.imgURL24],
 Walls_are_free_of_stains_undulations_or_cracks_dampness_Description: [''],



        
      
        
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
  console.log("startime time is updated");
});


        console.log("enter time",this.dateTime)
        //return this.dateTime
    
    
     }

         
  
  sendmail(){ 


    this.storageService.getObject('foyer form csv').then(result => {
    if (result != null) {
    console.log('foyer form csv: '+ result);
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
   this.storageService.setObject('foyer form csv', this.stdata);

  

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
       "foyeru": this.DiningData
      
       
     })
}).then(function() {
  console.log("foyer data is  updated");
});




  }

    


   //new end


   



      
  Electrical_wall_and_ceiling_points_are_covered (): void {      
        let Qvalue = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered ').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay1 =true;

        }else{
          this.cameradisplay1 =false;
        }

        this._cdr.detectChanges();  
        
      }  
      

  Electrical_ceiling_points_are_covered (): void {      
        let Qvalue = this.ionicForm.get('Electrical_ceiling_points_are_covered').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay2 =true;

        }else{
          this.cameradisplay2 =false;
        }

        this._cdr.detectChanges();  
        
      }

      
  

  Electrical_points_are_as_per_standard_offering (): void {      
        let Qvalue = this.ionicForm.get('Electrical_points_are_as_per_standard_offering').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay3 =true;

        }else{
          this.cameradisplay3 =false;
        }

        this._cdr.detectChanges();  
        
      }

      
  Switches_are_operable (): void {      
        let Qvalue = this.ionicForm.get('Switches_are_operable').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay4 =true;

        }else{
          this.cameradisplay4 =false;
        }

        this._cdr.detectChanges();  
        
      }

      

  Switch_plates_are_aligned(): void {      
        let Qvalue = this.ionicForm.get('Switch_plates_are_aligned').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay5 =true;

        }else{
          this.cameradisplay5 =false;
        }

        this._cdr.detectChanges();  
        
      }

      
 
  DB_and_Communication_boxes_are_fixed_properly (): void {      
        let Qvalue = this.ionicForm.get('DB_and_Communication_boxes_are_fixed_properly').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay6 =true;

        }else{
          this.cameradisplay6 =false;
        }

        this._cdr.detectChanges();  
        
      }
  

  
  External_false_ceiling_finish_over_main_door_is_correct(): void {      
        let Qvalue = this.ionicForm.get('External_false_ceiling_finish_over_main_door_is_correct').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay7 =true;

        }else{
          this.cameradisplay7 =false;
        }

        this._cdr.detectChanges();  
        
      }
  
 Walls_around_door_free_of_stains_or_cracks_or_dampness(): void {      
        let Qvalue = this.ionicForm.get('Walls_around_door_free_of_stains_or_cracks_or_dampness').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay8 =true;

        }else{
          this.cameradisplay8 =false;
        }

        this._cdr.detectChanges();  
        
      }
 
  
            Gaskets_sealants_are_intact(): void {      
        let Qvalue = this.ionicForm.get('Gaskets_sealants_are_intact').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay9 =true;

        }else{
          this.cameradisplay9 =false;
        }

        this._cdr.detectChanges();  
        
      }
          
            door_opens_And_closes_properly(): void {      
        let Qvalue = this.ionicForm.get('door_opens_And_closes_properly').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay10 =true;

        }else{
          this.cameradisplay10 =false;
        }

        this._cdr.detectChanges();  
        
      }
            

            Finishing_around_the_hardware(): void {      
        let Qvalue = this.ionicForm.get('Finishing_around_the_hardware').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay11 =true;

        }else{
          this.cameradisplay11 =false;
        }

        this._cdr.detectChanges();  
        
      }
            

            Architrave_is_consistent(): void {      
        let Qvalue = this.ionicForm.get('Architrave_is_consistent').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay12 =true;

        }else{
          this.cameradisplay12 =false;
        }

        this._cdr.detectChanges();  
        
      }
            
            Door_frame_and_shutter_shades_are_consistent(): void {      
        let Qvalue = this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay13 =true;

        }else{
          this.cameradisplay13 =false;
        }

        this._cdr.detectChanges();  
        
      }
           
            Shutter_is_aligned_when_shut_from_both_sides(): void {      
        let Qvalue = this.ionicForm.get('Shutter_is_aligned_when_shut_from_both_sides').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay14=true;

        }else{
          this.cameradisplay14 =false;
        }

        this._cdr.detectChanges();  
        
      } 
            

            Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks(): void {      
        let Qvalue = this.ionicForm.get('Door_frame_and_shutter_does_not_have_dent_or_scratches_or_marks').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay15 =true;

        }else{
          this.cameradisplay16=false;
        }

        this._cdr.detectChanges();  
        
      }
            
            Hardware_is_as_per_standard_offering(): void {      
        let Qvalue = this.ionicForm.get('Hardware_is_as_per_standard_offering').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay16 =true;

        }else{
          this.cameradisplay16 =false;
        }

        this._cdr.detectChanges();  
        
      }
            

            Lock_is_functional_from_both_sides(): void {      
        let Qvalue = this.ionicForm.get('Lock_is_functional_from_both_sides').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay17 =true;

        }else{
          this.cameradisplay17 =false;
        }

        this._cdr.detectChanges();  
        
      }
           

            Door_frame_and_wall_junctions_are_sealed(): void {      
        let Qvalue = this.ionicForm.get('Door_frame_and_wall_junctions_are_sealed').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay18=true;

        }else{
          this.cameradisplay18 =false;
        }

        this._cdr.detectChanges();  
        
      }
           
            Shade_variations_in_shutters(): void {      
        let Qvalue = this.ionicForm.get('Shade_variations_in_shutters').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay19 =true;

        }else{
          this.cameradisplay19 =false;
        }

        this._cdr.detectChanges();  
        
      }
            


           Granite_ledge_provided_is_free_of_cracks_and_sharp_edges(): void {      
        let Qvalue = this.ionicForm.get('Granite_ledge_provided_is_free_of_cracks_and_sharp_edges').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay20=true;

        }else{
          this.cameradisplay20 =false;
        }

        this._cdr.detectChanges();  
        
      }
           


            Video_door_phone_is_functional(): void {      
        let Qvalue = this.ionicForm.get('Video_door_phone_is_functional').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay21 =true;

        }else{
          this.cameradisplay21 =false;
        }

        this._cdr.detectChanges();  
        
      }
           

            
Video_door_phone_alignment_is_right(): void {      
        let Qvalue = this.ionicForm.get('Video_door_phone_alignment_is_right').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay22=true;

        }else{
          this.cameradisplay22 =false;
        }

        this._cdr.detectChanges();  
        
      }
           

            Video_door_phone_is_fixed(): void {      
        let Qvalue = this.ionicForm.get('Video_door_phone_is_fixed').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay23 =true;

        }else{
          this.cameradisplay23 =false;
        }

        this._cdr.detectChanges();  
        
      }
          
        

            Ceiling_is_free_of_undulations(): void {      
        let Qvalue = this.ionicForm.get('Ceiling_is_free_of_undulations').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay24 =true;

        }else{
          this.cameradisplay24 =false;
        }

        this._cdr.detectChanges();  
        
      }

        Walls_are_free_of_stains_undulations_or_cracks_or_dampness():void {      

        let Qvalue = this.ionicForm.get('Walls_are_free_of_stains_undulations_or_cracks_or_dampness').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay25 =true;

        }else{
          this.cameradisplay25=false;
        }

        this._cdr.detectChanges();  
        
      }


  notify1() {
      console.log("Toggled: "+ this.isToggled); 
      
      if(this.isToggled){
        console.log("false")
        this.isToggled=false;

      }else{
        console.log("true")
        this.isToggled=true;

      }
      this._cdr.detectChanges();
   

    }   
    notify2() {
      console.log("Toggled: "+ this.isToggled1); 
      
      if(this.isToggled1){
        console.log("false")
        this.isToggled1=false;

      }else{
        console.log("true")
        this.isToggled1=true;

      }
      this._cdr.detectChanges();
   

    }   
    notify3() {
      console.log("Toggled: "+ this.isToggled2); 
      
      if(this.isToggled2){
        console.log("false")
        this.isToggled2=false;

      }else{
        console.log("true")
        this.isToggled2=true;

      }
      this._cdr.detectChanges();
   

    }   
    notify4() {
      console.log("Toggled: "+ this.isToggled3); 
      
      if(this.isToggled3){
        console.log("false")
        this.isToggled3=false;

      }else{
        console.log("true")
        this.isToggled3=true;

      }
      this._cdr.detectChanges();
   

    }   

   

      


 

      
    notify5() {
      console.log("Toggled: "+ this.isToggled4); 
      
      if(this.isToggled4){
        console.log("false")
        this.isToggled4=false;

      }else{
        console.log("true")
        this.isToggled4=true;

      }
      this._cdr.detectChanges();
   

    }   
     notify6() {
      console.log("Toggled1: "+ this.isToggled5); 
      
      if(this.isToggled5){
        console.log("false")
        this.isToggled5=false;

      }else{
        console.log("true")
        this.isToggled5=true;

      }
      this._cdr.detectChanges();
   

    }   
     
 
}
