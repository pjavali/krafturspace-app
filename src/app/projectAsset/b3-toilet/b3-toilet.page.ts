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

               UPVC_hardware_is_standard:string;
                UPVC_hardware_is_standard_Photo: any;
              UPVC_hardware_is_standard_Description:string;

               Hardware_is_as_per_standard_offering:string;
                Hardware_is_as_per_standard_offering_Photo: any;
              Hardware_is_as_per_standard_offering_Description:string;

               Door_color_is_consistent:string;
                Door_color_is_consistent_Photo: any;
              Door_color_is_consistent_Description:string;

               UPVC_ventilators_are_operable:string;
                UPVC_ventilators_are_operable_Photo: any;
              UPVC_ventilators_are_operable_Description:string;

               Lock_can_be_operated_from_both_sides:string;
                Lock_can_be_operated_from_both_sides_Photo: any;
              Lock_can_be_operated_from_both_sides_Description:string;

               Gaskets_or_sealents_are_intact:string;
                Gaskets_or_sealents_are_intact_Photo: any;
              Gaskets_or_sealents_are_intact_Description:string;

               Door_frame_is_consistent_without_dent_or_scratches_or_marks:string;
                Door_frame_is_consistent_without_dent_or_scratches_or_marks_Photo: any;
              Door_frame_is_consistent_without_dent_or_scratches_or_marks_Description:string;

             Door_frame_and_shutter_gaps_are_consistent:string;
              Door_frame_and_shutter_gaps_are_consistent_Photo: any;
              Door_frame_and_shutter_gaps_are_consistent_Description:string;
            
            Electrical:string;

               Ceiling_electrical_points_are_covered_or_capped_properly:string;
                Ceiling_electrical_points_are_covered_or_capped_properly_Photo: any;
              Ceiling_electrical_points_are_covered_or_capped_properly_Description:string;

               Wall_Light_points_are_covered__or_capped_properly:string;
                Wall_Light_points_are_covered__or_capped_properly_Photo: any;
              Wall_Light_points_are_covered__or_capped_properly_Description:string;

               Switch_plates_are_aligned:string;
                Switch_plates_are_aligned_Photo: any;
              Switch_plates_are_aligned_Description:string;

               All_sockets_or_switches_above_false_ceiling_are_functional:string;
                All_sockets_or_switches_above_false_ceiling_are_functional_Photo: any;
              All_sockets_or_switches_above_false_ceiling_are_functional_Description:string;

               Electrical_points_are_as_per_standard_offering:string;
                Electrical_points_are_as_per_standard_offering_Photo: any;
              Electrical_points_are_as_per_standard_offering_Description:string;

               Exhaust_fan_connection:string;
                Exhaust_fan_connection_Photo: any;
              Exhaust_fan_connection_Description:string;

             Switches_are_operable:string;
              Switches_are_operable_Photo: any;
              Switches_are_operable_Description:string;
          
            Fixtures_and_Fittings:string;

               Wash_basin_faucet_is_operable:string;
                Wash_basin_faucet_is_operable_Photo: any;
              Wash_basin_faucet_is_operable_Description:string;

               Floor_trap_cover_is_provided:string;
                Floor_trap_cover_is_provided_Photo: any;
              Floor_trap_cover_is_provided_Description:string;

               Floor_trap_below_cover_is_clean :string;
                Floor_trap_below_cover_is_clean_Photo: any;
              Floor_trap_below_cover_is_clean_Description:string;

               Shower_head_is_functional:string;
                Shower_head_is_functional_Photo: any;
              Shower_head_is_functional_Description:string;

             Health_Faucet_is_functional:string;
              Health_Faucet_is_functional_Photo: any;
              Health_Faucet_is_functional_Description:string;
              
               Brackets_supporting_counter_is_painted_and_free_of_rust:string;
                Brackets_supporting_counter_is_painted_and_free_of_rust_Photo: any;
              Brackets_supporting_counter_is_painted_and_free_of_rust_Description:string;

               Washbasin_and_counter_edges_are_sealed:string;
                Washbasin_and_counter_edges_are_sealed_Photo: any;
              Washbasin_and_counter_edges_are_sealed_Description:string;

               Granite_counter_is_free_of_sharp_edges:string;
                Granite_counter_is_free_of_sharp_edges_Photo: any;
              Granite_counter_is_free_of_sharp_edges_Description:string;

               Toilet_Paper_Holder:string;
                Toilet_Paper_Holder_Photo: any;
              Toilet_Paper_Holder_Description:string;

             EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional:string;
              EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Photo: any;
              EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Description:string;
            
            Flooring:string;
               Slopes_are_adequate:string;
                Slopes_are_adequate_Photo: any;
              Slopes_are_adequate_Description:string;

               Tile_drop_between_dry_and_wet_areas :string;
                Tile_drop_between_dry_and_wet_areas_Photo: any;
              Tile_drop_between_dry_and_wet_areas_Description:string;

               Transition_betweeen_wooden_flooring_and_toilet_at_entry:string;
                Transition_betweeen_wooden_flooring_and_toilet_at_entry_Photo: any;
              Transition_betweeen_wooden_flooring_and_toilet_at_entry_Description:string;

               Tiles_are_laid_to_slope:string;
                Tiles_are_laid_to_slope_Photo: any;
              Tiles_are_laid_to_slope_Description:string;
            
            Standard_heights_of_fixtures:string;

               EWC:string;
                EWC_Photo: any;
              EWC_Description:string;

               Shower_head:string;
                Shower_head_Photo: any;
              Shower_head_Description:string;

               Wash_Basin:string;
                Wash_Basin_Photo: any;
              Wash_Basin_Description:string;
            
            Walls_and_ceiling:string;

               False_ceiling_channels_are_consistent:string;
                False_ceiling_channels_are_consistent_Photo: any;
              False_ceiling_channels_are_consistent_Description:string;

               Tile_surface_is_consistent:string;
                Tile_surface_is_consistent_Photo: any;
              Tile_surface_is_consistent_Description:string;

               EWC_Ledge_wall_granite_coping:string;
                EWC_Ledge_wall_granite_coping_Photo: any;
              EWC_Ledge_wall_granite_coping_Description:string;

               Vertical_Tiles_joints_and_ceiling_support_members_are_aligned:string;
                Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Photo: any;
              Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description:string;

               Check_for_uniform_line_and_level_of_the_dadoing_at_the_top:string;
                Check_for_uniform_line_and_level_of_the_dadoing_at_the_to_Photo: any;
              Check_for_uniform_line_and_level_of_the_dadoing_at_the_to_Description:string;

               Service_ledge_is_painted_and_clean:string;
                Service_ledge_is_painted_and_clean_Photo: any;
              Service_ledge_is_painted_and_clean_Description:string;

             Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc:string;
              Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Photo: any;
              Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Description:string;

               Consistency_of_corner_beading:string;
                Consistency_of_corner_beading_Photo: any;
              Consistency_of_corner_beading_Description:string;

               Area_above_false_ceiling_is_painted  :string;
              Area_above_false_ceiling_is_painted_Photo: any;
              Area_above_false_ceiling_is_painted_Description:string;

               Hollowness_in_wall_dado:string;
                 Hollowness_in_wall_dado_Photo: any;
               Hollowness_in_wall_dado_Description:string;

  



  
   
}

@Component({
  selector: 'app-b3-toilet',
  templateUrl: './b3-toilet.page.html',
  styleUrls: ['./b3-toilet.page.scss'],
})
export class B3ToiletPage implements OnInit {
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
cameradisplay26:boolean;
cameradisplay27:boolean;
cameradisplay28:boolean;
cameradisplay29:boolean;
cameradisplay30:boolean;
cameradisplay31:boolean;
cameradisplay32:boolean;
cameradisplay33:boolean;
cameradisplay34:boolean;
cameradisplay35:boolean;
cameradisplay36:boolean;
cameradisplay37:boolean;
cameradisplay38:boolean;
cameradisplay39:boolean;
cameradisplay40:boolean;
cameradisplay41:boolean;
cameradisplay42:boolean;
cameradisplay43:boolean;
cameradisplay44:boolean;
cameradisplay45:boolean;
cameradisplay46:boolean;
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
this.cameradisplay27=false;
this.cameradisplay28=false;
this.cameradisplay29=false;
this.cameradisplay30=false;
this.cameradisplay31=false;
this.cameradisplay32=false;
this.cameradisplay33=false;
this.cameradisplay34=false;
this.cameradisplay35=false;
this.cameradisplay36=false;
this.cameradisplay37=false;
this.cameradisplay38=false;
this.cameradisplay39=false;
this.cameradisplay40=false;
this.cameradisplay41=false;
this.cameradisplay42=false;
this.cameradisplay43=false;
this.cameradisplay44=false;
this.cameradisplay45=false;
this.cameradisplay46=false;
this.isSubmitted = false; 
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
                UPVC_hardware_is_standard:['',[Validators.required]],   
                UPVC_hardware_is_standard_Photo: [this.imgURL1],
              UPVC_hardware_is_standard_Description:[''],   

               Hardware_is_as_per_standard_offering:[''],   
                Hardware_is_as_per_standard_offering_Photo: [this.imgURL2],
              Hardware_is_as_per_standard_offering_Description:[''],   

               Door_color_is_consistent:[''],   
                Door_color_is_consistent_Photo: [this.imgURL3],
              Door_color_is_consistent_Description:[''],   

               UPVC_ventilators_are_operable:[''],   
                UPVC_ventilators_are_operable_Photo: [this.imgURL4],
              UPVC_ventilators_are_operable_Description:[''],   

               Lock_can_be_operated_from_both_sides:[''],   
                Lock_can_be_operated_from_both_sides_Photo: [this.imgURL5],
              Lock_can_be_operated_from_both_sides_Description:[''],   

               Gaskets_or_sealents_are_intact:[''],   
                Gaskets_or_sealents_are_intact_Photo: [this.imgURL6],
              Gaskets_or_sealents_are_intact_Description:[''],   

               Door_frame_is_consistent_without_dent_or_scratches_or_marks:[''],   
                Door_frame_is_consistent_without_dent_or_scratches_or_marks_Photo: [this.imgURL7],
              Door_frame_is_consistent_without_dent_or_scratches_or_marks_Description:[''],   

             Door_frame_and_shutter_gaps_are_consistent:['',[Validators.required]],   
              Door_frame_and_shutter_gaps_are_consistent_Photo: [this.imgURL8],
              Door_frame_and_shutter_gaps_are_consistent_Description:[''],   
            
            Electrical:[''],   

               Ceiling_electrical_points_are_covered_or_capped_properly:['',[Validators.required]],   
                Ceiling_electrical_points_are_covered_or_capped_properly_Photo: [this.imgURL9],
              Ceiling_electrical_points_are_covered_or_capped_properly_Description:[''],   

               Wall_Light_points_are_covered__or_capped_properly:[''],   
                Wall_Light_points_are_covered__or_capped_properly_Photo: [this.imgURL10],
              Wall_Light_points_are_covered__or_capped_properly_Description:[''],   

               Switch_plates_are_aligned:[''],   
                Switch_plates_are_aligned_Photo: [this.imgURL11],
              Switch_plates_are_aligned_Description:[''],   

               All_sockets_or_switches_above_false_ceiling_are_functional:[''],   
                All_sockets_or_switches_above_false_ceiling_are_functional_Photo: [this.imgURL12],
              All_sockets_or_switches_above_false_ceiling_are_functional_Description:[''],   

               Electrical_points_are_as_per_standard_offering:[''],   
                Electrical_points_are_as_per_standard_offering_Photo: [this.imgURL13],
              Electrical_points_are_as_per_standard_offering_Description:[''],   

               Exhaust_fan_connection:[''],   
                Exhaust_fan_connection_Photo: [this.imgURL14],
              Exhaust_fan_connection_Description:[''],   

             Switches_are_operable:['',[Validators.required]],   
              Switches_are_operable_Photo: [this.imgURL15],
              Switches_are_operable_Description:[''],   
          
            Fixtures_and_Fittings:[''],   

               Wash_basin_faucet_is_operable:['',[Validators.required]],   
                Wash_basin_faucet_is_operable_Photo: [this.imgURL16],
              Wash_basin_faucet_is_operable_Description:[''],   

               Floor_trap_cover_is_provided:[''],   
                Floor_trap_cover_is_provided_Photo: [this.imgURL17],
              Floor_trap_cover_is_provided_Description:[''],   

               Floor_trap_below_cover_is_clean :[''],   
                Floor_trap_below_cover_is_clean_Photo: [this.imgURL18],
              Floor_trap_below_cover_is_clean_Description:[''],   

               Shower_head_is_functional:[''],   
                Shower_head_is_functional_Photo: [this.imgURL19],
              Shower_head_is_functional_Description:[''],   

             Health_Faucet_is_functional:[''],   
              Health_Faucet_is_functional_Photo: [this.imgURL20],
              Health_Faucet_is_functional_Description:[''],   
              
               Brackets_supporting_counter_is_painted_and_free_of_rust:[''],   
                Brackets_supporting_counter_is_painted_and_free_of_rust_Photo: [this.imgURL21],
              Brackets_supporting_counter_is_painted_and_free_of_rust_Description:[''],   

               Washbasin_and_counter_edges_are_sealed:[''],   
                Washbasin_and_counter_edges_are_sealed_Photo: [this.imgURL22],
              Washbasin_and_counter_edges_are_sealed_Description:[''],   

               Granite_counter_is_free_of_sharp_edges:[''],   
                Granite_counter_is_free_of_sharp_edges_Photo: [this.imgURL23],
              Granite_counter_is_free_of_sharp_edges_Description:[''],   

               Toilet_Paper_Holder:[''],   
                Toilet_Paper_Holder_Photo: [this.imgURL24],
              Toilet_Paper_Holder_Description:[''],   

             EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional:['',[Validators.required]],   
              EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Photo: [this.imgURL25],
              EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Description:[''],   
            
            Flooring:[''],   
               Slopes_are_adequate:['',[Validators.required]],   
                Slopes_are_adequate_Photo: [this.imgURL26],
              Slopes_are_adequate_Description:[''],   

               Tile_drop_between_dry_and_wet_areas :[''],   
                Tile_drop_between_dry_and_wet_areas_Photo: [this.imgURL27],
              Tile_drop_between_dry_and_wet_areas_Description:[''],   

               Transition_betweeen_wooden_flooring_and_toilet_at_entry:[''],   
                Transition_betweeen_wooden_flooring_and_toilet_at_entry_Photo: [this.imgURL28],
              Transition_betweeen_wooden_flooring_and_toilet_at_entry_Description:[''],   

               Tiles_are_laid_to_slope:['',[Validators.required]],   
                Tiles_are_laid_to_slope_Photo: [this.imgURL29],
              Tiles_are_laid_to_slope_Description:[''],   
            
            Standard_heights_of_fixtures:[''],   

               EWC:['',[Validators.required]],   
                EWC_Photo: [this.imgURL30],
              EWC_Description:[''],   

               Shower_head:[''],   
                Shower_head_Photo: [this.imgURL31],
              Shower_head_Description:[''],   

               Wash_Basin:['',[Validators.required]],   
                Wash_Basin_Photo: [this.imgURL32],
              Wash_Basin_Description:[''],   
            
            Walls_and_ceiling:[''],   

               False_ceiling_channels_are_consistent:['',[Validators.required]],   
                False_ceiling_channels_are_consistent_Photo: [this.imgURL33],
              False_ceiling_channels_are_consistent_Description:[''],   

               Tile_surface_is_consistent:[''],   
                Tile_surface_is_consistent_Photo: [this.imgURL34],
              Tile_surface_is_consistent_Description:[''],   

               EWC_Ledge_wall_granite_coping:[''],   
                EWC_Ledge_wall_granite_coping_Photo: [this.imgURL35],
              EWC_Ledge_wall_granite_coping_Description:[''],   

               Vertical_Tiles_joints_and_ceiling_support_members_are_aligned:[''],   
                Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Photo: [this.imgURL36],
              Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description:[''],   

               Check_for_uniform_line_and_level_of_the_dadoing_at_the_top:[''],   
                Check_for_uniform_line_and_level_of_the_dadoing_at_the_to_Photo: [this.imgURL37],
              Check_for_uniform_line_and_level_of_the_dadoing_at_the_to_Description:[''],   

               Service_ledge_is_painted_and_clean:[''],   
                Service_ledge_is_painted_and_clean_Photo: [this.imgURL38],
              Service_ledge_is_painted_and_clean_Description:[''],   

             Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc:[''],   
              Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Photo: [this.imgURL38],
              Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Description:[''],   

               Consistency_of_corner_beading:[''],   
                Consistency_of_corner_beading_Photo: [this.imgURL40],
              Consistency_of_corner_beading_Description:[''],   

               Area_above_false_ceiling_is_painted  :[''],   
              Area_above_false_ceiling_is_painted_Photo: [this.imgURL41],
              Area_above_false_ceiling_is_painted_Description:[''],   

               Hollowness_in_wall_dado:['',[Validators.required]],   
                 Hollowness_in_wall_dado_Photo: [this.imgURL42],
               Hollowness_in_wall_dado_Description:['']   
      
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


    this.storageService.getObject('b3toilet form csv').then(result => {
    if (result != null) {

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
   this.storageService.setObject('b3toilet form csv', this.stdata);

    

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
       "b3toiletu": this.DiningData
      
       
     })
}).then(function() {
  console.log("b3toiletu data is  updated");
});




  }

    


   //new end



               UPVC_hardware_is_standard(): void {      
    let Qvalue = this.ionicForm.get('UPVC_hardware_is_standard').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay1 =true;

    }else{
      this.cameradisplay1 =false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Hardware_is_as_per_standard_offering(): void {      
    let Qvalue = this.ionicForm.get('Hardware_is_as_per_standard_offering').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay2 =true;

    }else{
      this.cameradisplay2 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Door_color_is_consistent(): void {      
    let Qvalue = this.ionicForm.get('Door_color_is_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay3 =true;

    }else{
      this.cameradisplay3 =false;
    }

    this._cdr.detectChanges();  
    
  }
              

               UPVC_ventilators_are_operable(): void {      
    let Qvalue = this.ionicForm.get('UPVC_ventilators_are_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay4 =true;

    }else{
      this.cameradisplay4 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Lock_can_be_operated_from_both_sides(): void {      
    let Qvalue = this.ionicForm.get('Lock_can_be_operated_from_both_sides').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay5 =true;

    }else{
      this.cameradisplay5 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Gaskets_or_sealents_are_intact(): void {      
    let Qvalue = this.ionicForm.get('Gaskets_or_sealents_are_intact').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay6 =true;

    }else{
      this.cameradisplay6 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Door_frame_is_consistent_without_dent_or_scratches_or_marks(): void {      
    let Qvalue = this.ionicForm.get('Door_frame_is_consistent_without_dent_or_scratches_or_marks').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay7 =true;

    }else{
      this.cameradisplay7 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

             Door_frame_and_shutter_gaps_are_consistent(): void {      
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_gaps_are_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay8 =true;

    }else{
      this.cameradisplay8 =false;
    }

    this._cdr.detectChanges();  
    
  }
             
            
            

               Ceiling_electrical_points_are_covered_or_capped_properly(): void {      
    let Qvalue = this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay9 =true;

    }else{
      this.cameradisplay9 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Wall_Light_points_are_covered__or_capped_properly(): void {      
    let Qvalue = this.ionicForm.get('Wall_Light_points_are_covered__or_capped_properly').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay10 =true;

    }else{
      this.cameradisplay10 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Switch_plates_are_aligned(): void {      
    let Qvalue = this.ionicForm.get('Switch_plates_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay11 =true;

    }else{
      this.cameradisplay11 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               All_sockets_or_switches_above_false_ceiling_are_functional(): void {      
    let Qvalue = this.ionicForm.get('All_sockets_or_switches_above_false_ceiling_are_functional').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay12 =true;

    }else{
      this.cameradisplay12 =false;
    }

    this._cdr.detectChanges();  
    
  }
              

               Electrical_points_are_as_per_standard_offering(): void {      
    let Qvalue = this.ionicForm.get('Electrical_points_are_as_per_standard_offering').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay13 =true;

    }else{
      this.cameradisplay13 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Exhaust_fan_connection(): void {      
    let Qvalue = this.ionicForm.get('Exhaust_fan_connection').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay14 =true;

    }else{
      this.cameradisplay14 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
             Switches_are_operable(): void {      
    let Qvalue = this.ionicForm.get('Switches_are_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay15 =true;

    }else{
      this.cameradisplay15 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
          
            

               Wash_basin_faucet_is_operable(): void {      
    let Qvalue = this.ionicForm.get('Wash_basin_faucet_is_operable').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay16 =true;

    }else{
      this.cameradisplay16 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Floor_trap_cover_is_provided(): void {      
    let Qvalue = this.ionicForm.get('Floor_trap_cover_is_provided').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay17 =true;

    }else{
      this.cameradisplay17 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               Floor_trap_below_cover_is_clean (): void {      
    let Qvalue = this.ionicForm.get('Floor_trap_below_cover_is_clean').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay18 =true;

    }else{
      this.cameradisplay18 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               Shower_head_is_functional(): void {      
    let Qvalue = this.ionicForm.get('Shower_head_is_functional').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay19 =true;

    }else{
      this.cameradisplay19 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

             Health_Faucet_is_functional(): void {      
    let Qvalue = this.ionicForm.get('Health_Faucet_is_functional').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay20=true;

    }else{
      this.cameradisplay20=false;
    }

    this._cdr.detectChanges();  
    
  }
              
              
               Brackets_supporting_counter_is_painted_and_free_of_rust(): void {      
    let Qvalue = this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay21 =true;

    }else{
      this.cameradisplay21 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Washbasin_and_counter_edges_are_sealed(): void {      
    let Qvalue = this.ionicForm.get('Washbasin_and_counter_edges_are_sealed').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay22 =true;

    }else{
      this.cameradisplay22 =false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Granite_counter_is_free_of_sharp_edges(): void {      
    let Qvalue = this.ionicForm.get('Granite_counter_is_free_of_sharp_edges').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay23 =true;

    }else{
      this.cameradisplay23 =false;
    }

    this._cdr.detectChanges();  
    
  }
             

               Toilet_Paper_Holder(): void {      
    let Qvalue = this.ionicForm.get('Toilet_Paper_Holder').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay24 =true;

    }else{
      this.cameradisplay24 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

             EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional(): void {      
    let Qvalue = this.ionicForm.get('EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay25 =true;

    }else{
      this.cameradisplay25 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
            
               Slopes_are_adequate(): void {      
    let Qvalue = this.ionicForm.get('Slopes_are_adequate').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay26 =true;

    }else{
      this.cameradisplay26 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               Tile_drop_between_dry_and_wet_areas (): void {      
    let Qvalue = this.ionicForm.get('Tile_drop_between_dry_and_wet_areas').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay27 =true;

    }else{
      this.cameradisplay27 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Transition_betweeen_wooden_flooring_and_toilet_at_entry(): void {      
    let Qvalue = this.ionicForm.get('Transition_betweeen_wooden_flooring_and_toilet_at_entry').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay28 =true;

    }else{
      this.cameradisplay28 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Tiles_are_laid_to_slope(): void {      
    let Qvalue = this.ionicForm.get('Tiles_are_laid_to_slope').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay29 =true;

    }else{
      this.cameradisplay29 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
            
           

               EWC(): void {      
    let Qvalue = this.ionicForm.get('EWC').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay30=true;

    }else{
      this.cameradisplay30=false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Shower_head(): void {      
    let Qvalue = this.ionicForm.get('Shower_head').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay31 =true;

    }else{
      this.cameradisplay31 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Wash_Basin(): void {      
    let Qvalue = this.ionicForm.get('Wash_Basin').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay32 =true;

    }else{
      this.cameradisplay32 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
            
            

               False_ceiling_channels_are_consistent(): void {      
    let Qvalue = this.ionicForm.get('False_ceiling_channels_are_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay33 =true;

    }else{
      this.cameradisplay33 =false;
    }

    this._cdr.detectChanges();  
    
  }
                

               Tile_surface_is_consistent(): void {      
    let Qvalue = this.ionicForm.get('Tile_surface_is_consistent').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay34 =true;

    }else{
      this.cameradisplay34 =false;
    }

    this._cdr.detectChanges();  
    
  }
              
               EWC_Ledge_wall_granite_coping(): void {      
    let Qvalue = this.ionicForm.get('EWC_Ledge_wall_granite_coping').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay35 =true;

    }else{
      this.cameradisplay35 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               Vertical_Tiles_joints_and_ceiling_support_members_are_aligned(): void {      
    let Qvalue = this.ionicForm.get('Vertical_Tiles_joints_and_ceiling_support_members_are_aligned').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay36 =true;

    }else{
      this.cameradisplay36 =false;
    }

    this._cdr.detectChanges();  
    
  }
               
               Check_for_uniform_line_and_level_of_the_dadoing_at_the_top(): void {      
    let Qvalue = this.ionicForm.get('Check_for_uniform_line_and_level_of_the_dadoing_at_the_top').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay37 =true;

    }else{
      this.cameradisplay37 =false;
    }

    this._cdr.detectChanges();  
    
  }
                
               Service_ledge_is_painted_and_clean(): void {      
    let Qvalue = this.ionicForm.get('Electrical_ceiling_points_are_covered').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay38 =true;

    }else{
      this.cameradisplay38 =false;
    }

    this._cdr.detectChanges();  
    
  }
              

             Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc(): void {      
    let Qvalue = this.ionicForm.get('Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay39 =true;

    }else{
      this.cameradisplay39 =false;
    }

    this._cdr.detectChanges();  
    
  }
            
               Consistency_of_corner_beading(): void {      
    let Qvalue = this.ionicForm.get('Consistency_of_corner_beading').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay40 =true;

    }else{
      this.cameradisplay40 =false;
    }

    this._cdr.detectChanges();  
    
  }
               

               Area_above_false_ceiling_is_painted  (): void {      
    let Qvalue = this.ionicForm.get('Area_above_false_ceiling_is_painted').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay41 =true;

    }else{
      this.cameradisplay41 =false;
    }

    this._cdr.detectChanges();  
    
  }
            

               Hollowness_in_wall_dado(): void {      
    let Qvalue = this.ionicForm.get('Hollowness_in_wall_dado').value;
    console.log("Q---->",Qvalue)
    if(Qvalue === "No"){

      this.cameradisplay42 =true;

    }else{
      this.cameradisplay42 =false;
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


}