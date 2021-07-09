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
  
            Core_cut:string;
               Core_cutting_for_kitchen_hood_towards_exterior:string;
               Core_cutting_for_kitchen_hood_towards_exterior_Photo: any;
              Core_cutting_for_kitchen_hood_towards_exterior_Description:string;

               Core_cut_area_pipe_is_cleaned:string;
               Core_cut_area_pipe_is_cleaned_Photo: any;
              Core_cut_area_pipe_is_cleaned_Description:string;

              Core_cut_pipe_is_finished_on_both_sides:string;
              Core_cut_pipe_is_finished_on_both_sides_Photo: any;
              Core_cut_pipe_is_finished_on_both_sides_Description:string;
           
            Doors_and_Windows:string;
               UPVC_kitchen_windows_bug_screen_is_operable:string;
                UPVC_kitchen_windows_bug_screen_is_operable_Photo: any;
              UPVC_kitchen_windows_bug_screen_is_operable_Description:string;

               Hardware_is_consistent:string;
                Hardware_is_consistent_Photo: any;
              Hardware_is_consistent_Description:string;

              UPVC_kitchen_windows_are_operable:string;
              UPVC_kitchen_windows_are_operable_Photo: any;
              UPVC_kitchen_windows_are_operable_Description:string;

               Gaskets_or_Sealants_are_intact:string;
                 Gaskets_or_Sealants_are_intact_Photo: any;
               Gaskets_or_Sealants_are_intact_Description:string;

               UPVC_kitchen_windows_are_free_of_sharp_edges:string;
                UPVC_kitchen_windows_are_free_of_sharp_edges_Photo: any;
              UPVC_kitchen_windows_are_free_of_sharp_edges_Description:string;

               UPVC_kitchen_bug_screen_mesh_is_taut:string;
               UPVC_kitchen_bug_screen_mesh_is_taut_Photo: any;
              UPVC_kitchen_bug_screen_mesh_is_taut_Description:string;
           
            Electrical:string;
               Switch_plates_are_aligned:string;
                Switch_plates_are_aligned_Photo: any;
              Switch_plates_are_aligned_Description:string;

              Ceiling_electrical_points_are_covered_or_capped_properly:string;
              Ceiling_electrical_points_are_covered_or_capped_properly_Photo: any;
              Ceiling_electrical_points_are_covered_or_capped_properly_Description:string;

               Electrical_points_are_as_per_standard_offering:string;
                Electrical_points_are_as_per_standard_offering_Photo: any;
              Electrical_points_are_as_per_standard_offering_Description:string;

               Wall_Light_points_are_covered__or_apped_properly:string;
                Wall_Light_points_are_covered__or_apped_properly_Photo: any;
              Wall_Light_points_are_covered__or_apped_properly_Description:string;
           
            Flooring:string;
               Vitrified_tiles_are_uniform__and_free_of_cracks:string;
                Vitrified_tiles_are_uniform__and_free_of_cracks_Photo: any;
              Vitrified_tiles_are_uniform__and_free_of_cracks_Description:string;
               Skirting_finish_and_alignment:string;
                Skirting_finish_and_alignment_Photo: any;
              Skirting_finish_and_alignment_Description:string;
           
            PHE:string;
               Floor_trap_or_ottle_trap_outlets_are_provided:string;
                Floor_trap_or_ottle_trap_outlets_are_provided_Photo: any;
              Floor_trap_or_ottle_trap_outlets_are_provided_Description:string;
               Sink_inlet_is_provided:string;
                Sink_inlet_is_provided_Photo: any;
              Sink_inlet_is_provided_Description:string;
               Floor_trap_cover_is_provided:string;
                Floor_trap_cover_is_provided_Photo: any;
              Floor_trap_cover_is_provided_Description:string;
               Floor_trap_is_free_of_dust_or_debris:string;
                Floor_trap_is_free_of_dust_or_debris_Photo: any;
              Floor_trap_is_free_of_dust_or_debris_Description:string;
           
            Reticulated_Gas:string;
               Reticulated_gas_pipes_are_clean:string;
                Reticulated_gas_pipes_are_clean_Photo: any;
              Reticulated_gas_pipes_are_clean_Description:string;
               Reticulated_gas_pipes_are_clamped_properly:string;
                Reticulated_gas_pipes_are_clamped_properly_Photo: any;
              Reticulated_gas_pipes_are_clamped_properly_Description:string;
           
            Walls_and_ceiling:string;
               Cornices_installed_are_consistent:string;
                Cornices_installed_are_consistent_Photo: any;
              Cornices_installed_are_consistent_Description:string;
               Junction_between_door_frame__and_wall_is_finished:string;
                Junction_between_door_frame__and_wall_is_finished_Photo: any;
             Junction_between_door_frame__and_wall_is_finished_Description:string;
               Ceilings_are_free_of_stains_or_ndulations_or_racks_etc:string;
                Ceilings_are_free_of_stains_or_ndulations_or_racks_etc_Photo: any;
              Ceilings_are_free_of_stains_or_ndulations_or_racks_etc_Description:string;
               Aluminium_member_betweeen_vitrified_flooring__and_marble_is_consistently_finished:string;
                Aluminium_member_betweeen_vitrified_flooring__and_marble_is_consistently_finished_Photo: any;
              Aluminium_member_betweeen_vitrified_flooring__and_marble_is_consistently_finished_Description:string;
               Walls_are_free_of_cracks_or_stains_etc:string;
                Walls_are_free_of_cracks_or_stains_etc_Photo: any;
              Walls_are_free_of_cracks_or_stains_etc_Description:string;
               Granite_Ledge_finish_is_without_sharp_edges:string;
                Granite_Ledge_finish_is_without_sharp_edges_Photo: any;
              Granite_Ledge_finish_is_without_sharp_edges_Description:string;
               Wall_behind_gas_pipe_assembly_are_finished:string;
                Wall_behind_gas_pipe_assembly_are_finished_Photo: any;
              Wall_behind_gas_pipe_assembly_are_finished_Description:string;

  



  
   
}

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.page.html',
  styleUrls: ['./kitchen.page.scss'],
})
export class KitchenPage implements OnInit {

  
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
cameradisplay27:boolean;
cameradisplay28:boolean;
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
 public formBuilder: FormBuilder

)
 {
    
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
this.cameradisplay26=false;
this.cameradisplay27=false;
this.cameradisplay28=false;
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

      


       Core_cut:['', [Validators.required]],
               Core_cutting_for_kitchen_hood_towards_exterior:['', [Validators.required]],
               Core_cutting_for_kitchen_hood_towards_exterior_Photo: [this.imgURL1, [Validators.required]],
              Core_cutting_for_kitchen_hood_towards_exterior_Description:['', [Validators.required]],

               Core_cut_area_pipe_is_cleaned:['', [Validators.required]],
               Core_cut_area_pipe_is_cleaned_Photo: [this.imgURL2, [Validators.required]],
              Core_cut_area_pipe_is_cleaned_Description:['', [Validators.required]],

              Core_cut_pipe_is_finished_on_both_sides:['', [Validators.required]],
              Core_cut_pipe_is_finished_on_both_sides_Photo: [this.imgURL3, [Validators.required]],
              Core_cut_pipe_is_finished_on_both_sides_Description:['', [Validators.required]],
           
            Doors_and_Windows:['', [Validators.required]],
               UPVC_kitchen_windows_bug_screen_is_operable:['', [Validators.required]],
                UPVC_kitchen_windows_bug_screen_is_operable_Photo: [this.imgURL4, [Validators.required]],
              UPVC_kitchen_windows_bug_screen_is_operable_Description:['', [Validators.required]],

               Hardware_is_consistent:['', [Validators.required]],
                Hardware_is_consistent_Photo: [this.imgURL5, [Validators.required]],
              Hardware_is_consistent_Description:['', [Validators.required]],

              UPVC_kitchen_windows_are_operable:['', [Validators.required]],
              UPVC_kitchen_windows_are_operable_Photo: [this.imgURL6, [Validators.required]],
              UPVC_kitchen_windows_are_operable_Description:['', [Validators.required]],

               Gaskets_or_Sealants_are_intact:['', [Validators.required]],
                 Gaskets_or_Sealants_are_intact_Photo: [this.imgURL7, [Validators.required]],
               Gaskets_or_Sealants_are_intact_Description:['', [Validators.required]],

               UPVC_kitchen_windows_are_free_of_sharp_edges:['', [Validators.required]],
                UPVC_kitchen_windows_are_free_of_sharp_edges_Photo: [this.imgURL8, [Validators.required]],
              UPVC_kitchen_windows_are_free_of_sharp_edges_Description:['', [Validators.required]],

               UPVC_kitchen_bug_screen_mesh_is_taut:['', [Validators.required]],
               UPVC_kitchen_bug_screen_mesh_is_taut_Photo: [this.imgURL9, [Validators.required]],
              UPVC_kitchen_bug_screen_mesh_is_taut_Description:['', [Validators.required]],
           
            Electrical:['', [Validators.required]],
               Switch_plates_are_aligned:['', [Validators.required]],
                Switch_plates_are_aligned_Photo: [this.imgURL10, [Validators.required]],
              Switch_plates_are_aligned_Description:['', [Validators.required]],

              Ceiling_electrical_points_are_covered_or_capped_properly:['', [Validators.required]],
              Ceiling_electrical_points_are_covered_or_capped_properly_Photo: [this.imgURL11, [Validators.required]],
              Ceiling_electrical_points_are_covered_or_capped_properly_Description:['', [Validators.required]],

               Electrical_points_are_as_per_standard_offering:['', [Validators.required]],
                Electrical_points_are_as_per_standard_offering_Photo: [this.imgURL12, [Validators.required]],
              Electrical_points_are_as_per_standard_offering_Description:['', [Validators.required]],

               Wall_Light_points_are_covered__or_apped_properly:['', [Validators.required]],
                Wall_Light_points_are_covered__or_apped_properly_Photo: [this.imgURL13, [Validators.required]],
              Wall_Light_points_are_covered__or_apped_properly_Description:['', [Validators.required]],
           
            Flooring:['', [Validators.required]],
               Vitrified_tiles_are_uniform__and_free_of_cracks:['', [Validators.required]],
                Vitrified_tiles_are_uniform__and_free_of_cracks_Photo: [this.imgURL14, [Validators.required]],
              Vitrified_tiles_are_uniform__and_free_of_cracks_Description:['', [Validators.required]],

               Skirting_finish_and_alignment:['', [Validators.required]],
                Skirting_finish_and_alignment_Photo: [this.imgURL15, [Validators.required]],
              Skirting_finish_and_alignment_Description:['', [Validators.required]],
           
            PHE:['', [Validators.required]],
               Floor_trap_or_ottle_trap_outlets_are_provided:['', [Validators.required]],
                Floor_trap_or_ottle_trap_outlets_are_provided_Photo: [this.imgURL16, [Validators.required]],
              Floor_trap_or_ottle_trap_outlets_are_provided_Description:['', [Validators.required]],

               Sink_inlet_is_provided:['', [Validators.required]],
                Sink_inlet_is_provided_Photo: [this.imgURL17, [Validators.required]],
              Sink_inlet_is_provided_Description:['', [Validators.required]],

               Floor_trap_cover_is_provided:['', [Validators.required]],
                Floor_trap_cover_is_provided_Photo: [this.imgURL18, [Validators.required]],
              Floor_trap_cover_is_provided_Description:['', [Validators.required]],
              
            Reticulated_Gas:['', [Validators.required]],
               Reticulated_gas_pipes_are_clean:['', [Validators.required]],
                Reticulated_gas_pipes_are_clean_Photo: [this.imgURL19, [Validators.required]],
              Reticulated_gas_pipes_are_clean_Description:['', [Validators.required]],

               Reticulated_gas_pipes_are_clamped_properly:['', [Validators.required]],
                Reticulated_gas_pipes_are_clamped_properly_Photo: [this.imgURL20, [Validators.required]],
              Reticulated_gas_pipes_are_clamped_properly_Description:['', [Validators.required]],
           
            Walls_and_ceiling:['', [Validators.required]],
               Cornices_installed_are_consistent:['', [Validators.required]],
                Cornices_installed_are_consistent_Photo: [this.imgURL21, [Validators.required]],
              Cornices_installed_are_consistent_Description:['', [Validators.required]],

               Junction_between_door_frame__and_wall_is_finished:['', [Validators.required]],
                Junction_between_door_frame__and_wall_is_finished_Photo: [this.imgURL22, [Validators.required]],
             Junction_between_door_frame__and_wall_is_finished_Description:['', [Validators.required]],

               Ceilings_are_free_of_stains_or_ndulations_or_racks_etc:['', [Validators.required]],
                Ceilings_are_free_of_stains_or_ndulations_or_racks_etc_Photo: [this.imgURL23, [Validators.required]],
              Ceilings_are_free_of_stains_or_ndulations_or_racks_etc_Description:['', [Validators.required]],

               Aluminium_member_betweeen_vitrified_flooring__and_marble_is_consistently_finished:['', [Validators.required]],
                Aluminium_member_betweeen_vitrified_flooring__and_marble_is_consistently_finished_Photo: [this.imgURL24, [Validators.required]],
              Aluminium_member_betweeen_vitrified_flooring__and_marble_is_consistently_finished_Description:['', [Validators.required]],

               Walls_are_free_of_cracks_or_stains_etc:['', [Validators.required]],
                Walls_are_free_of_cracks_or_stains_etc_Photo: [this.imgURL25, [Validators.required]],
              Walls_are_free_of_cracks_or_stains_etc_Description:['', [Validators.required]],

               Granite_Ledge_finish_is_without_sharp_edges:['', [Validators.required]],
                Granite_Ledge_finish_is_without_sharp_edges_Photo: [this.imgURL26, [Validators.required]],
              Granite_Ledge_finish_is_without_sharp_edges_Description:['', [Validators.required]],

               Wall_behind_gas_pipe_assembly_are_finished:['', [Validators.required]],
                Wall_behind_gas_pipe_assembly_are_finished_Photo: [this.imgURL27, [Validators.required]],
              Wall_behind_gas_pipe_assembly_are_finished_Description:['', [Validators.required]]


      
     
      
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




 
               Core_cutting_for_kitchen_hood_towards_exterior(): void {      
    let Qvalue = this.ionicForm.get(' Core_cutting_for_kitchen_hood_towards_exterior').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
               Core_cut_area_pipe_is_cleaned(): void {      
    let Qvalue = this.ionicForm.get('Core_cut_area_pipe_is_cleaned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay2 =true;

    }else{
      this.cameradisplay2 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

              Core_cut_pipe_is_finished_on_both_sides(): void {      
    let Qvalue = this.ionicForm.get('Core_cut_pipe_is_finished_on_both_sides').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay3 =true;

    }else{
      this.cameradisplay3 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
           
           
               UPVC_kitchen_windows_bug_screen_is_operable(): void {      
    let Qvalue = this.ionicForm.get('UPVC_kitchen_windows_bug_screen_is_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay4 =true;

    }else{
      this.cameradisplay4 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Hardware_is_consistent(): void {      
    let Qvalue = this.ionicForm.get('Hardware_is_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay5 =true;

    }else{
      this.cameradisplay5 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

              UPVC_kitchen_windows_are_operable(): void {      
    let Qvalue = this.ionicForm.get('UPVC_kitchen_windows_are_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay6 =true;

    }else{
      this.cameradisplay6 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
               Gaskets_or_Sealants_are_intact(): void {      
    let Qvalue = this.ionicForm.get(' Gaskets_or_Sealants_are_intact').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay7 =true;

    }else{
      this.cameradisplay7 =false;
    }

    this._cdr.detectChanges();  
    
  }
                 
               UPVC_kitchen_windows_are_free_of_sharp_edges(): void {      
    let Qvalue = this.ionicForm.get('UPVC_kitchen_windows_are_free_of_sharp_edges').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay8 =true;

    }else{
      this.cameradisplay8 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               UPVC_kitchen_bug_screen_mesh_is_taut(): void {      
    let Qvalue = this.ionicForm.get('UPVC_kitchen_bug_screen_mesh_is_taut').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay9 =true;

    }else{
      this.cameradisplay9 =false;
    }

    this._cdr.detectChanges();  
    
  }
             
           
            
               Switch_plates_are_aligned(): void {      
    let Qvalue = this.ionicForm.get(' Switch_plates_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay10 =true;

    }else{
      this.cameradisplay10 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

              Ceiling_electrical_points_are_covered_or_capped_properly(): void {      
    let Qvalue = this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay11 =true;

    }else{
      this.cameradisplay11 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
               Electrical_points_are_as_per_standard_offering(): void {      
    let Qvalue = this.ionicForm.get('Electrical_points_are_as_per_standard_offering').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay12 =true;

    }else{
      this.cameradisplay12 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Wall_Light_points_are_covered__or_apped_properly(): void {      
    let Qvalue = this.ionicForm.get('Wall_Light_points_are_covered__or_apped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay13 =true;

    }else{
      this.cameradisplay13 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
           
           
               Vitrified_tiles_are_uniform__and_free_of_cracks(): void {      
    let Qvalue = this.ionicForm.get('Vitrified_tiles_are_uniform__and_free_of_cracks').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay14 =true;

    }else{
      this.cameradisplay14 =false;
    }

    this._cdr.detectChanges();  
    
  }
              

               Skirting_finish_and_alignment(): void {      
    let Qvalue = this.ionicForm.get('Skirting_finish_and_alignment').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay15 =true;

    }else{
      this.cameradisplay15 =false;
    }

    this._cdr.detectChanges();  
    
  }
             
           
            
               Floor_trap_or_ottle_trap_outlets_are_provided(): void {      
    let Qvalue = this.ionicForm.get('Floor_trap_or_ottle_trap_outlets_are_provided').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay16 =true;

    }else{
      this.cameradisplay16 =false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Sink_inlet_is_provided(): void {      
    let Qvalue = this.ionicForm.get('Sink_inlet_is_provided').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay17 =true;

    }else{
      this.cameradisplay17 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               Floor_trap_cover_is_provided(): void {      
    let Qvalue = this.ionicForm.get('Floor_trap_cover_is_provided').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay18 =true;

    }else{
      this.cameradisplay18 =false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Floor_trap_is_free_of_dust_or_debris(): void {      
    let Qvalue = this.ionicForm.get('Floor_trap_is_free_of_dust_or_debris').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay19 =true;

    }else{
      this.cameradisplay19 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
           
           
               Reticulated_gas_pipes_are_clean(): void {      
    let Qvalue = this.ionicForm.get('Reticulated_gas_pipes_are_clean').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay20=true;

    }else{
      this.cameradisplay20=false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Reticulated_gas_pipes_are_clamped_properly(): void {      
    let Qvalue = this.ionicForm.get(' Reticulated_gas_pipes_are_clamped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay21 =true;

    }else{
      this.cameradisplay21 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
           
            
            
               Cornices_installed_are_consistent(): void {      
    let Qvalue = this.ionicForm.get('Cornices_installed_are_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay22 =true;

    }else{
      this.cameradisplay22 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
              

               Junction_between_door_frame__and_wall_is_finished(): void {      
    let Qvalue = this.ionicForm.get('Junction_between_door_frame__and_wall_is_finished').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay23 =true;

    }else{
      this.cameradisplay23 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               
               Ceilings_are_free_of_stains_or_ndulations_or_racks_etc(): void {      
    let Qvalue = this.ionicForm.get('Ceilings_are_free_of_stains_or_ndulations_or_racks_etc').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay24 =true;

    }else{
      this.cameradisplay24 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
              

               Aluminium_member_betweeen_vitrified_flooring_and_marble_is_consistently_finished(): void {      
    let Qvalue = this.ionicForm.get('Aluminium_member_betweeen_vitrified_flooring_and_marble_is_consistently_finished').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay25 =true;

    }else{
      this.cameradisplay25 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               

               Walls_are_free_of_cracks_or_stains_etc(): void {      
    let Qvalue = this.ionicForm.get('Walls_are_free_of_cracks_or_stains_etc').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               

               Granite_Ledge_finish_is_without_sharp_edges(): void {      
    let Qvalue = this.ionicForm.get(' Granite_Ledge_finish_is_without_sharp_edges').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
              
               Wall_behind_gas_pipe_assembly_are_finished(): void {      
    let Qvalue = this.ionicForm.get('Wall_behind_gas_pipe_assembly_are_finished').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
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

notify5() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled5){
    console.log("true")
    this.isToggled5=false;

  }else{
    console.log("flase")
     this.isToggled5=true;

  }
   this._cdr.detectChanges();
   

}
notify6() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled6){
    console.log("true")
    this.isToggled6=false;

  }else{
    console.log("flase")
     this.isToggled6=true;

  }
   this._cdr.detectChanges();
   

}
  
notify7() {
  console.log("Toggled: "+ this.isToggled); 
  
  if(this.isToggled7){
    console.log("true")
    this.isToggled7=false;

  }else{
    console.log("flase")
     this.isToggled7=true;

  }
   this._cdr.detectChanges();
   

}

}

