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



interface StudentData {
  Electrical:string;

  Electrical_wall_points_are_covered:string;  
  Electrical_wall_points_are_covered_Photo: any;
  Electrical_wall_points_are_covered_Description:string;

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

  DB_is_fixed_properly : string;
  DB_is_fixed_properly_Photo: any;
  DB_is_fixed_properly_Description:string;

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

            Confirm_door_opens_And_closes_properly:string;
            Confirm_door_opens_And_closes_properly_Photo:any;
            Confirm_door_opens_And_closes_properly_Photo_Description:string;

            Finishing_around_the_hardware:string;
            Finishing_around_the_hardware_Photo:any;
            Finishing_around_the_hardware_Description:string;

            Architrave_is_consistent:string;
            Architrave_is_consistent_Photo:any;
            Architrave_is_consistent_Description:string;

            Dents_marks_on_Main_door_shutter:string;
            Dents_marks_on_Main_door_shutter_Photo:any;
            Dents_marks_on_Main_door_shutter_Description:string;

            Internal_and_external_shutter_alignments:string; 
            Internal_and_external_shutter_alignments_Photo:any;
            Internal_and_external_shutter_alignments_Description:string;

            Dents_marks_on_Main_door_frame:string;
            Dents_marks_on_Main_door_frame_Photo: any;
            Dents_marks_on_Main_door_frame_Description:string;

            Hardware_as_per_standard_offering:string;
            Hardware_as_per_standard_offering_Photo:any;
            Hardware_as_per_standard_offering_Description:string;

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
           Finishing_of_granite_coping_on_ledges:string;
           Finishing_of_granite_coping_on_ledges_Photo:any;
            Finishing_of_granite_coping_on_ledges_Description:string;

Video_Door_Phone:string;
            Video_door_phone_is_functional:string;
            Video_door_phone_is_functional_Photo:any;
            Video_door_phone_is_functional_Description:string;

            Video_door_phone_alignment:string;
            Video_door_phone_alignment_Photo:any;
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



starttime:any;
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
 public formBuilder: FormBuilder

)
 {
   
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
    
    

      this.ionicForm = this.formBuilder.group({

        Electrical:['', [Validators.required]],

        Electrical_wall_points_are_covered: ['', [Validators.required]],
        Electrical_wall_points_are_covered_Photo: [this.imgURL1, [Validators.required]],
        Electrical_wall_points_are_covered_Description: ['', [Validators.required]],

        Electrical_ceiling_points_are_covered :['', [Validators.required]],
        Electrical_ceiling_points_are_covered_Photo: [this.imgURL2, [Validators.required]],
        Electrical_ceiling_points_are_covered_Description: ['', [Validators.required]],

        Electrical_points_are_as_per_standard_offering : ['', [Validators.required]],
        Electrical_points_are_as_per_standard_offering_Photo: [this.imgURL3, [Validators.required]],
        Electrical_points_are_as_per_standard_offering_Description:['', [Validators.required]],

        Switches_are_operable : ['', [Validators.required]],
        Switches_are_operable_Photo: [this.imgURL4, [Validators.required]],
        Switches_are_operable_Description:['', [Validators.required]],


        Switch_plates_are_aligned: ['', [Validators.required]],
        Switch_plates_are_aligned_Photo: [this.imgURL5, [Validators.required]],
        Switch_plates_are_aligned_Description:['', [Validators.required]],


        DB_is_fixed_properly : ['', [Validators.required]],
        DB_is_fixed_properly_Photo: [this.imgURL6, [Validators.required]],
        DB_is_fixed_properly_Description:['', [Validators.required]],


        Exterior_Surface:['', [Validators.required]],
  External_false_ceiling_finish_over_main_door_is_correct: ['', [Validators.required]],
  External_false_ceiling_finish_over_main_door_is_correct_Photo:[this.imgURL7, [Validators.required]],
  External_false_ceiling_finish_over_main_door_is_correct_Description: ['', [Validators.required]],

  Walls_around_door_free_of_stains_or_cracks_or_dampness: ['', [Validators.required]],
  Walls_around_door_free_of_stains_or_cracks_or_dampness_Photo:[this.imgURL8, [Validators.required]],
  Walls_around_door_free_of_stains_or_cracks_or_dampness_Description: ['', [Validators.required]],

  Main_Door:['', [Validators.required]],
            Gaskets_sealants_are_intact: ['', [Validators.required]],
            Gaskets_sealants_are_intact_Photo:[this.imgURL9, [Validators.required]],
            Gaskets_ealants_are_intact_Description: ['', [Validators.required]],

            Confirm_door_opens_And_closes_properly: ['', [Validators.required]],
            Confirm_door_opens_And_closes_properly_Photo:[this.imgURL10, [Validators.required]],
            Confirm_door_opens_And_closes_properly_Photo_Description: ['', [Validators.required]],

            Finishing_around_the_hardware: ['', [Validators.required]],
            Finishing_around_the_hardware_Photo:[this.imgURL11, [Validators.required]],
            Finishing_around_the_hardware_Description: ['', [Validators.required]],

            Architrave_is_consistent: ['', [Validators.required]],
            Architrave_is_consistent_Photo:[this.imgURL12, [Validators.required]],
            Architrave_is_consistent_Description: ['', [Validators.required]],

            Dents_marks_on_Main_door_shutter: ['', [Validators.required]],
            Dents_marks_on_Main_door_shutter_Photo:[this.imgURL13, [Validators.required]],
            Dents_marks_on_Main_door_shutter_Description: ['', [Validators.required]],

            Internal_and_external_shutter_alignments: ['', [Validators.required]],
            Internal_and_external_shutter_alignments_Photo:[this.imgURL14, [Validators.required]],
            Internal_and_external_shutter_alignments_Description: ['', [Validators.required]],

            Dents_marks_on_Main_door_frame: ['', [Validators.required]],
            Dents_marks_on_Main_door_frame_Photo: [this.imgURL14, [Validators.required]],
            Dents_marks_on_Main_door_frame_Description: ['', [Validators.required]],

            Hardware_as_per_standard_offering: ['', [Validators.required]],
            Hardware_as_per_standard_offering_Photo:[this.imgURL15, [Validators.required]],
            Hardware_as_per_standard_offering_Description: ['', [Validators.required]],

            Lock_is_functional_from_both_sides: ['', [Validators.required]],
            Lock_is_functional_from_both_sides_Photo:[this.imgURL16, [Validators.required]],
            Lock_is_functional_from_both_sides_Description: ['', [Validators.required]],

            Door_frame_and_wall_junctions_are_sealed: ['', [Validators.required]],
            Door_frame_and_wall_junctions_are_sealed_Photo:[this.imgURL17, [Validators.required]],
            Door_frame_and_wall_junctions_are_sealed_Description: ['', [Validators.required]],

            Shade_variations_in_shutters: ['', [Validators.required]],
            Shade_variations_in_shutters_Photo:[this.imgURL18, [Validators.required]],
            Shade_variations_in_shutters_Description: ['', [Validators.required]],
Miscellaneous:['', [Validators.required]],
           Finishing_of_granite_coping_on_ledges: ['', [Validators.required]],
           Finishing_of_granite_coping_on_ledges_Photo:[this.imgURL19, [Validators.required]],
            Finishing_of_granite_coping_on_ledges_Description: ['', [Validators.required]],

Video_Door_Phone:['', [Validators.required]],
            Video_door_phone_is_functional: ['', [Validators.required]],
            Video_door_phone_is_functional_Photo:[this.imgURL20, [Validators.required]],
            Video_door_phone_is_functional_Description: ['', [Validators.required]],

            Video_door_phone_alignment: ['', [Validators.required]],
            Video_door_phone_alignment_Photo:[this.imgURL21, [Validators.required]],
            Video_door_phone_alignment_Description: ['', [Validators.required]],

            Video_door_phone_is_fixed: ['', [Validators.required]],
           Video_door_phone_is_fixed_Photo:[this.imgURL22, [Validators.required]],
            Video_door_phone_is_fixed_Description: ['', [Validators.required]],
        
 Walls_and_Ceiling:['', [Validators.required]],
 Ceiling_is_free_of_undulations: ['', [Validators.required]],
 Ceiling_is_free_of_undulations_Photo: [this.imgURL23, [Validators.required]],
 Ceiling_is_free_of_undulations_Description: ['', [Validators.required]],

 Walls_are_free_of_stains_undulations_or_cracks_or_dampness: ['', [Validators.required]],
 Walls_are_free_of_stains_undulations_or_cracks_or_dampness_Photo:[this.imgURL24, [Validators.required]],
 Walls_are_free_of_stains_undulations_or_cracks_dampness_Description: ['', [Validators.required]]



        
      
        
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





      getDate(e) {
        let date = new Date(e.target.value).toISOString().substring(0, 10);

        console.log("date--",date)
        this.ionicForm.get('dob').setValue(date, {
          onlyself: true
        })
      }

      get errorControl() {
        return this.ionicForm.controls;
      }

      submitForm() {

        console.log(this.ionicForm.value)
        
        /*this.isSubmitted = true;
        if (!this.ionicForm.valid) {
          console.log('Please provide all the required values!')
          return false;
        } else {
          console.log(this.ionicForm.value)
        }*/
      }

   



      
  Electrical_wall_points_are_covered(): void {      
        let Qvalue = this.ionicForm.get('Electrical_wall_points_are_covered').value;
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

      
 
  DB_is_fixed_properly (): void {      
        let Qvalue = this.ionicForm.get('DB_is_fixed_properly').value;
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
  
  Walls_around_door_free_of_stains_cracks_dampness(): void {      
        let Qvalue = this.ionicForm.get('Walls_around_door_free_of_stains_cracks_dampness').value;
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
          
            Confirm_door_opens_And_closes_properly(): void {      
        let Qvalue = this.ionicForm.get('Confirm_door_opens_And_closes_properly').value;
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
            
            Dents_marks_on_Main_door_shutter(): void {      
        let Qvalue = this.ionicForm.get('Dents_marks_on_Main_door_shutter').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay13 =true;

        }else{
          this.cameradisplay13 =false;
        }

        this._cdr.detectChanges();  
        
      }
           
            Internal_and_external_shutter_alignments(): void {      
        let Qvalue = this.ionicForm.get('Internal_and_external_shutter_alignments').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay14=true;

        }else{
          this.cameradisplay14 =false;
        }

        this._cdr.detectChanges();  
        
      } 
            

            Dents_marks_on_Main_door_frame(): void {      
        let Qvalue = this.ionicForm.get('Dents_marks_on_Main_door_frame').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay15 =true;

        }else{
          this.cameradisplay16=false;
        }

        this._cdr.detectChanges();  
        
      }
            
            Hardware_as_per_standard_offering(): void {      
        let Qvalue = this.ionicForm.get('Hardware_as_per_standard_offering').value;
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
            


           Finishing_of_granite_coping_on_ledges(): void {      
        let Qvalue = this.ionicForm.get('Finishing_of_granite_coping_on_ledges').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay20=true;

        }else{
          this.cameradisplay20 =false;
        }

        this._cdr.detectChanges();  
        
      }
           


            Video_door_phone_is_functional(): void {      
        let Qvalue = this.ionicForm.get(' Video_door_phone_is_functional').value;
        console.log("Q---->",Qvalue)
        if(Qvalue === "No"){

          this.cameradisplay21 =true;

        }else{
          this.cameradisplay21 =false;
        }

        this._cdr.detectChanges();  
        
      }
           

            Video_door_phone_alignment(): void {      
        let Qvalue = this.ionicForm.get('Video_door_phone_alignment').value;
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
            

            Walls_are_free_of_stains_undulations_or_cracks_or_dampness(): void {      
        let Qvalue = this.ionicForm.get(' Walls_are_free_of_stains_undulations_or_cracks_or_dampness').value;
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
