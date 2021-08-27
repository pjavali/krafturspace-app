import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

//new
import { Papa } from 'ngx-papaparse';

import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage-angular';

import { Item, StorageService } from 'src/app/services/storage.service';

import { FilePath } from '@ionic-native/file-path/ngx';
import { promise } from 'protractor';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

interface StudentData {
  Doors_and_Windows: string;

  UPVC_hardware_is_standard: string;
  UPVC_hardware_is_standard_Photo: any;
  UPVC_hardware_is_standard_Description: string;

  Hardware_is_as_per_standard_offering: string;
  Hardware_is_as_per_standard_offering_Photo: any;
  Hardware_is_as_per_standard_offering_Description: string;

  Door_frame_and_shutter_shades_are_consistent: string;
  Door_frame_and_shutter_shades_are_consistent_Photo: any;
  Door_frame_and_shutter_shades_are_consistent_Description: string;

  UPVC_ventilators_are_operable: string;
  UPVC_ventilators_are_operable_Photo: any;
  UPVC_ventilators_are_operable_Description: string;

  Lock_can_be_operated_from_both_sides: string;
  Lock_can_be_operated_from_both_sides_Photo: any;
  Lock_can_be_operated_from_both_sides_Description: string;

  Gaskets_or_sealents_are_intact: string;
  Gaskets_or_sealents_are_intact_Photo: any;
  Gaskets_or_sealents_are_intact_Description: string;

  Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks: string;
  Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Photo: any;
  Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Description: string;

  Door_frame_and_shutter_gaps_are_consistent: string;
  Door_frame_and_shutter_gaps_are_consistent_Photo: any;
  Door_frame_and_shutter_gaps_are_consistent_Description: string;

  Electrical: string;

  Ceiling_electrical_points_are_covered_or_capped_properly: string;
  Ceiling_electrical_points_are_covered_or_capped_properly_Photo: any;
  Ceiling_electrical_points_are_covered_or_capped_properly_Description: string;

  Wall_Light_points_are_covered__or_capped_properly: string;
  Wall_Light_points_are_covered__or_capped_properly_Photo: any;
  Wall_Light_points_are_covered__or_capped_properly_Description: string;

  Switch_plates_are_aligned: string;
  Switch_plates_are_aligned_Photo: any;
  Switch_plates_are_aligned_Description: string;

  All_sockets_or_switches_above_false_ceiling_are_functional: string;
  All_sockets_or_switches_above_false_ceiling_are_functional_Photo: any;
  All_sockets_or_switches_above_false_ceiling_are_functional_Description: string;

  Electrical_points_are_as_per_standard_offering: string;
  Electrical_points_are_as_per_standard_offering_Photo: any;
  Electrical_points_are_as_per_standard_offering_Description: string;

  Exhaust_fan_connection: string;
  Exhaust_fan_connection_Photo: any;
  Exhaust_fan_connection_Description: string;

  Switches_are_operable: string;
  Switches_are_operable_Photo: any;
  Switches_are_operable_Description: string;

  Fixtures_and_Fittings: string;

  Wash_basin_faucet_is_operable: string;
  Wash_basin_faucet_is_operable_Photo: any;
  Wash_basin_faucet_is_operable_Description: string;

  Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust: string;
  Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Photo: any;
  Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Description: string;

  Floor_trap_below_cover_is_clean: string;
  Floor_trap_below_cover_is_clean_Photo: any;
  Floor_trap_below_cover_is_clean_Description: string;

  Shower_head_and_divertor_are_functional: string;

  Shower_head_and_divertor_are_functional_Photo: any;

  Shower_head_and_divertor_are_functional_Description: string;

  Health_Faucet_is_functional: string;
  Health_Faucet_is_functional_Photo: any;
  Health_Faucet_is_functional_Description: string;

  Brackets_supporting_counter_is_painted_and_free_of_rust: string;
  Brackets_supporting_counter_is_painted_and_free_of_rust_Photo: any;
  Brackets_supporting_counter_is_painted_and_free_of_rust_Description: string;

  Washbasin_and_counter_edges_are_sealed: string;
  Washbasin_and_counter_edges_are_sealed_Photo: any;
  Washbasin_and_counter_edges_are_sealed_Description: string;

  Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps: string;
  Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Photo: any;
  Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Description: string;

  Toilet_Paper_Holder: string;
  Toilet_Paper_Holder_Photo: any;
  Toilet_Paper_Holder_Description: string;

  EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional: string;
  EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Photo: any;
  EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Description: string;

  Flooring: string;

  Slopes_provided_are_adequate: string;

  Slopes_provided_are_adequate_Photo: any;

  Slopes_provided_are_adequate_Description: string;

  Tile_drop_between_dry_and_wet_areas_exists: string;
  Tile_drop_between_dry_and_wet_areas_exists_Photo: any;
  Tile_drop_between_dry_and_wet_areas_exists_Description: string;

  Transition_member_betweeen_wooden_flooring_and_toilet_at_entry: string;

  Transition_member_betweeen_wooden_flooring_and_toilet_at_entry_Photo: any;

  Transition_member_betweeen_wooden_flooring_and_toilet_at_entryy_Description: string;

  Tiles_are_laid_to_slope_without_hollowness: string;
  Tiles_are_laid_to_slope_without_hollowness_Photo: any;
  Tiles_are_laid_to_slope_without_hollowness_Description: string;

  Standard_heights_of_fixtures: string;

  EWC: string;
  EWC_Photo: any;
  EWC_Description: string;

  Shower_head: string;
  Shower_head_Photo: any;
  Shower_head_Description: string;

  Wash_Basin: string;
  Wash_Basin_Photo: any;
  Wash_Basin_Description: string;
  Wash_Basin_in_mm: string;

  Walls_and_ceiling: string;

  False_ceiling_channels_are_consistent: string;
  False_ceiling_channels_are_consistent_Photo: any;
  False_ceiling_channels_are_consistent_Description: string;

  Tile_Dado_surface_is_consistent_and_without_hollowness: string;
  Tile_Dado_surface_is_consistent_and_without_hollowness_Photo: any;
  Tile_Dado_surface_is_consistent_and_without_hollowness_Description: string;

  EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges: string;
  EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Photo: any;
  EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Description: string;

  Vertical_Tiles_joints_and_ceiling_support_members_are_aligned: string;
  Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Photo: any;
  Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description: string;

  Dado_top_line_is_uniform_and_consistent: string;
  Dado_top_line_is_uniform_and_consistent_Photo: any;
  Dado_top_line_is_uniform_and_consistent_Description: string;

  Service_ledge_is_painted_and_clean: string;
  Service_ledge_is_painted_and_clean_Photo: any;
  Service_ledge_is_painted_and_clean_Description: string;

  Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc: string;
  Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Photo: any;
  Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Description: string;

  Consistency_of_corner_beading: string;
  Consistency_of_corner_beading_Photo: any;
  Consistency_of_corner_beading_Description: string;

  Area_above_false_ceiling_is_painted: string;
  Area_above_false_ceiling_is_painted_Photo: any;
  Area_above_false_ceiling_is_painted_Description: string;

  Hollowness_in_wall_dado: string;
  Hollowness_in_wall_dado_Photo: any;
  Hollowness_in_wall_dado_Description: string;
}

@Component({
  selector: 'app-b2-toilet',
  templateUrl: './b2-toilet.page.html',
  styleUrls: ['./b2-toilet.page.scss']
})
export class B2ToiletPage implements OnInit {
  //new
  completiontime: any;
  flist: any;
  flatnumber: any;
  au: any;
  dateTime: any;
  stdata: any;
  arr: any[];
  csvData: any;
  issubmit: boolean;
  idata: any;
  AssetData: any;
  DiningData: any;

  isenabled:boolean=true;
  isection: string;
  recivedData: any;
  data: any;
  mypicref: any;
  currentId: any[];
  cameradisplay1: boolean;
  cameradisplay2: boolean;
  cameradisplay3: boolean;
  cameradisplay4: boolean;
  cameradisplay5: boolean;
  cameradisplay6: boolean;
  cameradisplay7: boolean;
  cameradisplay8: boolean;
  cameradisplay9: boolean;
  cameradisplay10: boolean;
  cameradisplay11: boolean;
  cameradisplay12: boolean;
  cameradisplay13: boolean;
  cameradisplay14: boolean;
  cameradisplay15: boolean;
  cameradisplay16: boolean;
  cameradisplay17: boolean;
  cameradisplay18: boolean;
  cameradisplay19: boolean;
  cameradisplay20: boolean;
  cameradisplay21: boolean;
  cameradisplay22: boolean;
  cameradisplay23: boolean;
  cameradisplay24: boolean;
  cameradisplay25: boolean;
  cameradisplay26: boolean;
  cameradisplay27: boolean;
  cameradisplay28: boolean;
  cameradisplay29: boolean;
  cameradisplay30: boolean;
  cameradisplay31: boolean;
  cameradisplay32: boolean;
  cameradisplay33: boolean;
  cameradisplay34: boolean;
  cameradisplay35: boolean;
  cameradisplay36: boolean;
  cameradisplay37: boolean;
  cameradisplay38: boolean;
  cameradisplay39: boolean;
  cameradisplay40: boolean;
  cameradisplay41: boolean;
  cameradisplay42: boolean;
  cameradisplay43: boolean;
  cameradisplay44: boolean;
  cameradisplay45: boolean;
  cameradisplay46: boolean;
  isSubmitted = false;
  ionicForm: FormGroup;

  inspectionList = [];
  inspectionData: StudentData;
  inspectionForm: FormGroup;
  isToggled: boolean;
  imgURL1: any;
  imgURL2: any;
  imgURL3: any;
  imgURL4: any;
  imgURL5: any;
  imgURL6: any;
  imgURL7: any;
  imgURL8: any;
  imgURL9: any;
  imgURL10: any;
  imgURL11: any;
  imgURL12: any;
  imgURL13: any;
  imgURL14: any;
  imgURL15: any;
  imgURL16: any;
  imgURL17: any;
  imgURL18: any;
  imgURL19: any;
  imgURL20: any;
  imgURL21: any;
  imgURL22: any;
  imgURL23: any;
  imgURL24: any;
  imgURL25: any;
  imgURL26: any;
  imgURL27: any;
  imgURL28: any;
  imgURL29: any;
  imgURL30: any;
  imgURL31: any;
  imgURL32: any;
  imgURL33: any;
  imgURL34: any;
  imgURL35: any;
  imgURL36: any;
  imgURL37: any;
  imgURL38: any;
  imgURL39: any;
  imgURL40: any;
  imgURL41: any;
  imgURL42: any;
  imgURL43: any;
  imgURL44: any;
  imgURL45: any;
  imgURL46: any;
  imgURL47: any;
  imgURL48: any;
  imgURL49: any;
  imgURL50: any;

  isToggled1: boolean;
  isToggled2: boolean;
  isToggled3: boolean;
  isToggled4: boolean;
  isToggled5: boolean;
  isToggled6: boolean;
  isToggled7: boolean;
  isToggled8: boolean;
  isToggled9: boolean;
  isToggled10: boolean;

  //19/08/2021
  picdata: any;
  picurl: any;
  taskRef: any;

  items: Item[] = [];
  newItem: Item = <Item>{};
  newItem1: Item = <Item>{};
  newItem2: Item = <Item>{};
  newItem3: Item = <Item>{};
  newItem4: Item = <Item>{};
  b2toiletdata: any[] = [];
  foyerproject: any[] = [];

  getall: Item = <Item>{};
  sendingfile: any[];

  getdata1: any;

  //new

  value: any;
  udata: any[];

  currentImage = null;
  ar: any;
  endtime: any;

  cid: any;
  cuser: any;
  cinpect_title: any;
  cphotourl: any;
  cDescription: any;
  ctimestamp: any;
  //new
  project_Name: any;
  Project_Type: any;
  project_Address: any;
  Project_Assigned: any;
  Flat_Number: any;
  projectD: any = [];
  project_starTime: any;
  project_endTime: any;
  dUrl: any;
  picURL: string;
  path: any;
  dataDirectory: any;
  //new
  to: string;
  cc: string;
  bcc: string;
  attachment: any;
  subject: string;
  body: string;

  issave = false;

  eForm: FormGroup;


  showicon1: boolean;
  showicon2: boolean;
  showicon3: boolean;
  showicon4: boolean;
  showicon5: boolean;
  showicon6: boolean;
  showicon7: boolean;
  showicon8: boolean;
  showicon9: boolean;
  showicon10: boolean;
  showicon11: boolean;
  showicon12: boolean;
  showicon13: boolean;
  showicon14: boolean;
  showicon15: boolean;
  showicon16: boolean;
  showicon17: boolean;
  showicon18: boolean;
  showicon19: boolean;
  showicon20: boolean;
  showicon21: boolean;
  showicon22: boolean;
  showicon23: boolean;
  showicon24: boolean;
  showicon25: boolean;
  showicon26: boolean;
  showicon27: boolean;
  showicon28: boolean;
  showicon29: boolean;
  showicon30: boolean;
  showicon31: boolean;
  showicon32: boolean;
  showicon33: boolean;
  showicon34: boolean;
  showicon35: boolean;
  showicon36: boolean;
  showicon37: boolean;
  showicon38: boolean;
  showicon39: boolean;
  showicon40: boolean;
  showicon41: boolean;
  showicon42: boolean;
  showicon43: boolean;
  showicon44: boolean;
  showicon45: boolean;
  showicon46: boolean;
  showicon47: boolean;
  showicon48: boolean;
  showicon49: boolean;
  showicon50: boolean;

  static newItem: any;

  constructor(
    private Platform: Platform,
    private _cdr: ChangeDetectorRef,
    public http: HttpClient,
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private afFirestore: AngularFirestore,
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
  ) {
    this.issubmit = false;
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
    this.imgURL1 = null;
    this.imgURL2 = null;
    this.imgURL3 = null;
    this.imgURL4 = null;
    this.imgURL5 = null;
    this.imgURL6 = null;
    this.imgURL7 = null;
    this.imgURL8 = null;
    this.imgURL9 = null;
    this.imgURL10 = null;
    this.imgURL11 = null;
    this.imgURL12 = null;
    this.imgURL13 = null;
    this.imgURL14 = null;
    this.imgURL15 = null;
    this.imgURL16 = null;
    this.imgURL17 = null;
    this.imgURL19 = null;
    this.imgURL20 = null;
    this.imgURL21 = null;
    this.imgURL22 = null;
    this.imgURL23 = null;
    this.imgURL24 = null;
    this.imgURL25 = null;
    this.imgURL26 = null;
    this.imgURL27 = null;
    this.imgURL28 = null;
    this.imgURL29 = null;
    this.imgURL30 = null;
    this.imgURL31 = null;
    this.imgURL32 = null;
    this.imgURL33 = null;
    this.imgURL34 = null;
    this.imgURL35 = null;
    this.imgURL36 = null;
    this.imgURL37 = null;
    this.imgURL38 = null;
    this.imgURL39 = null;
    this.imgURL40 = null;
    this.imgURL41 = null;
    this.imgURL42 = null;
    this.imgURL43 = null;
    this.imgURL44 = null;
    this.imgURL45 = null;
    this.imgURL46 = null;
    this.imgURL47 = null;
    this.imgURL48 = null;
    this.imgURL49 = null;
    this.imgURL50 = null;
    //new
    this.cameradisplay1 = false;
    this.cameradisplay2 = false;
    this.cameradisplay3 = false;

    this.cameradisplay4 = false;
    this.cameradisplay5 = false;
    this.cameradisplay6 = false;
    this.cameradisplay7 = false;
    this.cameradisplay8 = false;
    this.cameradisplay9 = false;
    this.cameradisplay10 = false;
    this.cameradisplay11 = false;
    this.cameradisplay12 = false;
    this.cameradisplay13 = false;
    this.cameradisplay14 = false;
    this.cameradisplay15 = false;
    this.cameradisplay16 = false;
    this.cameradisplay17 = false;
    this.cameradisplay18 = false;
    this.cameradisplay19 = false;
    this.cameradisplay20 = false;
    this.cameradisplay21 = false;
    this.cameradisplay22 = false;
    this.cameradisplay23 = false;
    this.cameradisplay24 = false;
    this.cameradisplay25 = false;
    this.cameradisplay26 = false;
    this.cameradisplay27 = false;
    this.cameradisplay28 = false;
    this.cameradisplay29 = false;
    this.cameradisplay30 = false;
    this.cameradisplay31 = false;
    this.cameradisplay32 = false;
    this.cameradisplay33 = false;
    this.cameradisplay34 = false;
    this.cameradisplay35 = false;
    this.cameradisplay36 = false;
    this.cameradisplay37 = false;
    this.cameradisplay38 = false;
    this.cameradisplay38 = false;
    this.cameradisplay40 = false;
    this.cameradisplay41 = false;

    this.showicon1 = false;
    this.showicon2 = false;
    this.showicon3 = false;
    this.showicon4 = false;
    this.showicon5 = false;
    this.showicon6 = false;
    this.showicon7 = false;
    this.showicon8 = false;
    this.showicon9 = false;
    this.showicon10 = false;
    this.showicon11 = false;
    this.showicon12 = false;
    this.showicon13 = false;
    this.showicon14 = false;
    this.showicon15 = false;
    this.showicon16 = false;
    this.showicon17 = false;
    this.showicon18 = false;
    this.showicon19 = false;
    this.showicon20 = false;
    this.showicon21 = false;
    this.showicon22 = false;
    this.showicon23 = false;
    this.showicon24 = false;
    this.showicon25 = false;
    this.showicon26 = false;
    this.showicon27 = false;
    this.showicon28 = false;
    this.showicon29 = false;
    this.showicon30 = false;
    this.showicon31 = false;
    this.showicon32 = false;
    this.showicon33 = false;
    this.showicon34 = false;
    this.showicon35 = false;
    this.showicon36 = false;
    this.showicon37 = false;
    this.showicon38 = false;
    this.showicon39 = false;
    this.showicon40 = false;
    this.showicon41 = false;
    this.showicon42 = false;
    this.showicon43 = false;
    this.showicon44 = false;
    this.showicon45 = false;
    this.showicon46 = false;
    this.showicon47 = false;
    this.showicon48 = false;
    this.showicon49 = false;
    this.showicon50 = false;

    this.isSubmitted = false;
    console.log('1st--->', this.isToggled);

    this.inspectionData = {} as StudentData;

    this.mypicref = firebase.storage().ref('/');

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        this.currentId = this.data.id;
        console.log('recived data @foyer page', this.data);

        this.recivedData = this.data;
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
            this.au = userProfileSnapshot.data();
            console.log('current user', this.au.email);
          });
      }
    });
    this.storage.create();
    const db = firebase.firestore();

    db.collection('test1')
      .doc(this.recivedData)
      .get()
      .then(doc => {
        console.log('all', doc.data().Flat_Number);
        this.flatnumber = doc.data().Flat_Number;
      });

    //new

    this.ionicForm = this.formBuilder.group({
      Doors_and_Windows: [''],
      UPVC_hardware_is_standard: ['', [Validators.required]],
      UPVC_hardware_is_standard_Photo: [''],
      UPVC_hardware_is_standard_Description: [''],

      Hardware_is_as_per_standard_offering: [''],
      Hardware_is_as_per_standard_offering_Photo: [''],
      Hardware_is_as_per_standard_offering_Description: [''],

      Door_frame_and_shutter_shades_are_consistent: [''],
      Door_frame_and_shutter_shades_are_consistent_Photo: [''],
      Door_frame_and_shutter_shades_are_consistent_Description: [''],

      UPVC_ventilators_are_operable: [''],
      UPVC_ventilators_are_operable_Photo: [''],
      UPVC_ventilators_are_operable_Description: [''],

      Lock_can_be_operated_from_both_sides: [''],
      Lock_can_be_operated_from_both_sides_Photo: [''],
      Lock_can_be_operated_from_both_sides_Description: [''],

      Gaskets_or_sealents_are_intact: [''],
      Gaskets_or_sealents_are_intact_Photo: [''],
      Gaskets_or_sealents_are_intact_Description: [''],

      Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks: [''],
      Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Photo: [''],
      Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Description: [''],

      Door_frame_and_shutter_gaps_are_consistent: ['', [Validators.required]],
      Door_frame_and_shutter_gaps_are_consistent_Photo: [''],
      Door_frame_and_shutter_gaps_are_consistent_Description: [''],

      Electrical: [''],

      Ceiling_electrical_points_are_covered_or_capped_properly: ['', [Validators.required]],
      Ceiling_electrical_points_are_covered_or_capped_properly_Photo: [''],
      Ceiling_electrical_points_are_covered_or_capped_properly_Description: [''],

      Wall_Light_points_are_covered__or_capped_properly: [''],
      Wall_Light_points_are_covered__or_capped_properly_Photo: [''],
      Wall_Light_points_are_covered__or_capped_properly_Description: [''],

      Switch_plates_are_aligned: [''],
      Switch_plates_are_aligned_Photo: [''],
      Switch_plates_are_aligned_Description: [''],

      All_sockets_or_switches_above_false_ceiling_are_functional: [''],
      All_sockets_or_switches_above_false_ceiling_are_functional_Photo: [''],
      All_sockets_or_switches_above_false_ceiling_are_functional_Description: [''],

      Electrical_points_are_as_per_standard_offering: [''],
      Electrical_points_are_as_per_standard_offering_Photo: [''],
      Electrical_points_are_as_per_standard_offering_Description: [''],

      Exhaust_fan_connection: [''],
      Exhaust_fan_connection_Photo: [''],
      Exhaust_fan_connection_Description: [''],

      Switches_are_operable: ['', [Validators.required]],
      Switches_are_operable_Photo: [''],
      Switches_are_operable_Description: [''],

      Fixtures_and_Fittings: [''],

      Wash_basin_faucet_is_operable: ['', [Validators.required]],
      Wash_basin_faucet_is_operable_Photo: [''],
      Wash_basin_faucet_is_operable_Description: [''],

      Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust: [''],
      Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Photo: [''],
      Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Description: [''],

      Floor_trap_below_cover_is_clean: [''],
      Floor_trap_below_cover_is_clean_Photo: [''],
      Floor_trap_below_cover_is_clean_Description: [''],

      Shower_head_and_divertor_are_functional: [''],

      Shower_head_and_divertor_are_functional_Photo: [''],

      Shower_head_and_divertor_are_functional_Description: [''],

      Health_Faucet_is_functional: [''],
      Health_Faucet_is_functional_Photo: [''],
      Health_Faucet_is_functional_Description: [''],

      Brackets_supporting_counter_is_painted_and_free_of_rust: [''],
      Brackets_supporting_counter_is_painted_and_free_of_rust_Photo: [''],
      Brackets_supporting_counter_is_painted_and_free_of_rust_Description: [''],

      Washbasin_and_counter_edges_are_sealed: [''],
      Washbasin_and_counter_edges_are_sealed_Photo: [''],
      Washbasin_and_counter_edges_are_sealed_Description: [''],

      Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps: [''],
      Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Photo: [''],
      Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Description: [''],

      Toilet_Paper_Holder: [''],
      Toilet_Paper_Holder_Photo: [''],
      Toilet_Paper_Holder_Description: [''],

      EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional: ['', [Validators.required]],
      EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Photo: [''],
      EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Description: [''],

      Flooring: [''],

      Slopes_provided_are_adequate: ['', [Validators.required]],

      Slopes_provided_are_adequate_Photo: [''],

      Slopes_provided_are_adequate_Description: [''],

      Tile_drop_between_dry_and_wet_areas_exists: [''],
      Tile_drop_between_dry_and_wet_areas_exists_Photo: [''],
      Tile_drop_between_dry_and_wet_areas_exists_Description: [''],

      Transition_member_betweeen_wooden_flooring_and_toilet_at_entry: [''],

      Transition_member_betweeen_wooden_flooring_and_toilet_at_entry_Photo: [''],

      Transition_member_betweeen_wooden_flooring_and_toilet_at_entry_Description: [''],

      Tiles_are_laid_to_slope_without_hollowness: ['', [Validators.required]],
      Tiles_are_laid_to_slope_without_hollowness_Photo: [''],
      Tiles_are_laid_to_slope_without_hollowness_Description: [''],

      Standard_heights_of_fixtures: [''],

      EWC: ['', [Validators.required]],
      EWC_Photo: [''],
      EWC_Description: [''],

      Shower_head: [''],
      Shower_head_Photo: [''],
      Shower_head_Description: [''],

      Wash_Basin: ['', [Validators.required]],
      Wash_Basin_Photo: [''],
      Wash_Basin_Description: [''],
      Wash_Basin_in_mm: [''],

      Walls_and_ceiling: [''],

      False_ceiling_channels_are_consistent: ['', [Validators.required]],
      False_ceiling_channels_are_consistent_Photo: [''],
      False_ceiling_channels_are_consistent_Description: [''],

      Tile_Dado_surface_is_consistent_and_without_hollowness: [''],
      Tile_Dado_surface_is_consistent_and_without_hollowness_Photo: [''],
      Tile_Dado_surface_is_consistent_and_without_hollowness_Description: [''],

      EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges: [''],
      EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Photo: [''],
      EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Description: [''],

      Vertical_Tiles_joints_and_ceiling_support_members_are_aligned: [''],
      Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Photo: [''],
      Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description: [''],

      Dado_top_line_is_uniform_and_consistent: [''],
      Dado_top_line_is_uniform_and_consistent_Photo: [''],
      Dado_top_line_is_uniform_and_consistent_Description: [''],

      Service_ledge_is_painted_and_clean: [''],
      Service_ledge_is_painted_and_clean_Photo: [''],
      Service_ledge_is_painted_and_clean_Description: [''],

      Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc: [''],
      Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Photo: [''],
      Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_etc_Description: [''],

      Consistency_of_corner_beading: [''],
      Consistency_of_corner_beading_Photo: [''],
      Consistency_of_corner_beading_Description: [''],

      Area_above_false_ceiling_is_painted: [''],
      Area_above_false_ceiling_is_painted_Photo: [''],
      Area_above_false_ceiling_is_painted_Description: [''],

      Hollowness_in_wall_dado: ['', [Validators.required]],
      Hollowness_in_wall_dado_Photo: [''],
      Hollowness_in_wall_dado_Description: ['']
    });
  }

  //camer section

  getGallery1() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;

      this.imgURL1 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('UPVC_hardware_is_standard"_Photo').setValue(this.imgURL1);
      this.upload1();
    });
  }

  upload1() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save1(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon1 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      project_Name: this.project_Name,
      Project_Type: this.Project_Type,
      project_Address: this.project_Address,
      Flat_Number: this.Flat_Number,
      inpect_title: 'UPVC_hardware_is_standard"',
      photourl: this.picdata,
      Description: this.ionicForm.get('UPVC_hardware_is_standard"_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage1(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'UPVC_hardware_is_standard"';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('UPVC_hardware_is_standard"_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'j.prajwal@gmail.com',
      cc: 'j.prajwal@gmail.com',
      attachments: [],
      subject: 'UPVC_hardware_is_standard"',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery2() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL28 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Hardware_is_as_per_standard_offering_Photo').setValue(this.imgURL2);
      ///this.ionicForm[].Electrical_wall_and_ceiling_points_are_covered_Photo=this.imgURL1;
      // this.currentImage = this.imgURL1;

      //alert(this.currentImage);

      this.upload2();
    });
  }

  upload2() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      // Upload completed successfully, now we can get the download URL
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save2(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon3 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_points_are_as_per_standard_offering',
      photourl: this.imgURL3,
      Description: this.ionicForm.get('Hardware_is_as_per_standard_offering_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage2() {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Hardware_is_as_per_standard_offering';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Hardware_is_as_per_standard_offering_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem1(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Hardware_is_as_per_standard_offering',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery3() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL3 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent_Photo').setValue(this.imgURL3);
      ///this.ionicForm[].Electrical_wall_and_ceiling_points_are_covered_Photo=this.imgURL1;
      // this.currentImage = this.imgURL1;

      //alert(this.currentImage);

      this.upload3();
    });
  }

  upload3() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      // Upload completed successfully, now we can get the download URL
      ref.getDownloadURL().then(function (downloadURL) {
        //alert(savedPicture.info);
        //alert(downloadURL);
        // alert(downloadURL);
        //  this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(downloadURL);
        //this.ionicForm.[Electrical_wall_and_ceiling_points_are_covered_Photo: ['']= downloadURL;
      });
    });
  }

  save3(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon3 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Door_frame_and_shutter_shades_are_consistent',
      photourl: this.imgURL3,
      Description: this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage3() {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Door_frame_and_shutter_shades_are_consistent';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem1(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Door_frame_and_shutter_shades_are_consistent',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery4() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL4 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('UPVC_ventilators_are_operable_Photo').setValue(this.imgURL4);
      this.upload4();
    });
  }

  upload4() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save4(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon4 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'UPVC_ventilators_are_operable',
      photourl: this.imgURL4,
      Description: this.ionicForm.get('UPVC_ventilators_are_operable_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage4(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'UPVC_ventilators_are_operable';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('UPVC_ventilators_are_operable_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'UPVC_ventilators_are_operable',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery5() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL5 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Lock_can_be_operated_from_both_sides_Photo').setValue(this.imgURL5);
      this.upload5();
    });
  }

  upload5() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save5(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon5 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Lock_can_be_operated_from_both_sides',
      photourl: this.imgURL5,
      Description: this.ionicForm.get('Lock_can_be_operated_from_both_sides_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage5(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Lock_can_be_operated_from_both_sides';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Lock_can_be_operated_from_both_sides_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Lock_can_be_operated_from_both_sides',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery6() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL6 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Gaskets_or_sealents_are_intact_Photo').setValue(this.imgURL6);
      this.upload6();
    });
  }

  upload6() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save6(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon6 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Gaskets_or_sealents_are_intact',
      photourl: this.imgURL6,
      Description: this.ionicForm.get('Gaskets_or_sealents_are_intact_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage6(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Gaskets_or_sealents_are_intact';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Gaskets_or_sealents_are_intact_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Gaskets_or_sealents_are_intact',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery7() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL7 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Photo').setValue(this.imgURL7);
      this.upload7();
    });
  }

  upload7() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save7(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon7 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks',
      photourl: this.imgURL7,
      Description: this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage7(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery8() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL8 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Door_frame_and_shutter_gaps_are_consistent_Photo').setValue(this.imgURL8);
      this.upload8();
    });
  }

  upload8() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save8(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon8 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Door_frame_and_shutter_gaps_are_consistent',
      photourl: this.imgURL8,
      Description: this.ionicForm.get('Door_frame_and_shutter_gaps_are_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage8(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Door_frame_and_shutter_gaps_are_consistent';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Door_frame_and_shutter_gaps_are_consistent_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Door_frame_and_shutter_gaps_are_consistent',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery9() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL9 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly_Photo').setValue(this.imgURL9);
      this.upload9();
    });
  }

  upload9() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save9(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon9 = true;
    9;
    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Ceiling_electrical_points_are_covered_or_capped_properly',
      photourl: this.imgURL9,
      Description: this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage9(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Ceiling_electrical_points_are_covered_or_capped_properly';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Ceiling_electrical_points_are_covered_or_capped_properly',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery10() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL10 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Wall_Light_points_are_covered__or_capped_properly_Photo').setValue(this.imgURL10);
      this.upload10();
    });
  }

  upload10() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save10(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon10 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Wall_Light_points_are_covered__or_capped_properly',
      photourl: this.imgURL10,
      Description: this.ionicForm.get('Wall_Light_points_are_covered__or_capped_properly_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage10(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Wall_Light_points_are_covered__or_capped_properly';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Wall_Light_points_are_covered__or_capped_properly_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Wall_Light_points_are_covered__or_capped_properly',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery11() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL11 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Switch_plates_are_aligned_Photo').setValue(this.imgURL11);
      this.upload11();
    });
  }

  upload11() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save11() {
    this.storage.clear();
    console.log('save clicked');
    this.showicon11 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Switch_plates_are_aligned',
      photourl: this.imgURL11,
      Description: this.ionicForm.get('Switch_plates_are_aligned_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage11() {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Switch_plates_are_aligned';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Switch_plates_are_aligned_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Switch_plates_are_aligned',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery12() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL12 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('All_sockets_or_switches_above_false_ceiling_are_functional_Photo').setValue(this.imgURL12);
      this.upload12();
    });
  }

  upload12() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save12() {
    this.storage.clear();
    console.log('save clicked');
    this.showicon12 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'All_sockets_or_switches_above_false_ceiling_are_functional',
      photourl: this.imgURL12,
      Description: this.ionicForm.get('All_sockets_or_switches_above_false_ceiling_are_functional_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage12(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'All_sockets_or_switches_above_false_ceiling_are_functional';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('All_sockets_or_switches_above_false_ceiling_are_functional_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'All_sockets_or_switches_above_false_ceiling_are_functional',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery13() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL12 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_points_are_as_per_standard_offering_Photo').setValue(this.imgURL12);
      this.upload13();
    });
  }

  upload13() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save13(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon13 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_points_are_as_per_standard_offering',
      photourl: this.imgURL13,
      Description: this.ionicForm.get('Electrical_points_are_as_per_standard_offering_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage13(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_points_are_as_per_standard_offering';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_points_are_as_per_standard_offering_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Electrical_points_are_as_per_standard_offering',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery14() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL14 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Exhaust_fan_connection_Photo').setValue(this.imgURL14);
      this.upload14();
    });
  }

  upload14() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save14(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon14 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Exhaust_fan_connection',
      photourl: this.imgURL14,
      Description: this.ionicForm.get('Exhaust_fan_connection_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage14(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Exhaust_fan_connection';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Exhaust_fan_connection_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Exhaust_fan_connection',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery15() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL15 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Switches_are_operable_Photo').setValue(this.imgURL15);
      this.upload15();
    });
  }

  upload15() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save15(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon15 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Switches_are_operable',
      photourl: this.imgURL15,
      Description: this.ionicForm.get('Switches_are_operable_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage15(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Switches_are_operable';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Switches_are_operable_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Switches_are_operable',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery16() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL16 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust_Photo').setValue(this.imgURL16);
      this.upload16();
    });
  }

  upload16() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save16(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon16 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Brackets_supporting_counter_is_painted_and_free_of_rust',
      photourl: this.imgURL16,
      Description: this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage16(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Brackets_supporting_counter_is_painted_and_free_of_rust';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Brackets_supporting_counter_is_painted_and_free_of_rust',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery17() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL17 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Photo').setValue(this.imgURL17);
      this.upload17();
    });
  }

  upload17() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save17(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon17 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust',
      photourl: this.imgURL17,
      Description: this.ionicForm.get('Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage17(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery18() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL18 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Floor_trap_below_cover_is_clean_Photo').setValue(this.imgURL18);
      this.upload18();
    });
  }

  upload18() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save18(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon18 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Floor_trap_below_cover_is_clean',
      photourl: this.imgURL18,
      Description: this.ionicForm.get('Floor_trap_below_cover_is_clean_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage18(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Floor_trap_below_cover_is_clean';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Floor_trap_below_cover_is_clean_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Floor_trap_below_cover_is_clean',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery19() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL19 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Shower_head_and_divertor_are_functional_Photo').setValue(this.imgURL19);
      this.upload19();
    });
  }

  upload19() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save19(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon19 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Shower_head_and_divertor_are_functional',
      photourl: this.imgURL19,
      Description: this.ionicForm.get('Shower_head_and_divertor_are_functional_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage19(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Shower_head_and_divertor_are_functional';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Shower_head_and_divertor_are_functional_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Shower_head_and_divertor_are_functional',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery20() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL20 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Health_Faucet_is_functional_Photo').setValue(this.imgURL20);
      this.upload20();
    });
  }

  upload20() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save20(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon20 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Health_Faucet_is_functional',
      photourl: this.imgURL20,
      Description: this.ionicForm.get('Health_Faucet_is_functional_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage20(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Health_Faucet_is_functional';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Health_Faucet_is_functional_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Health_Faucet_is_functional',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery21() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL21 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust_Photo').setValue(this.imgURL21);
      this.upload21();
    });
  }

  upload21() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save21(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon21 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Brackets_supporting_counter_is_painted_and_free_of_rust',
      photourl: this.imgURL21,
      Description: this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage21(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Brackets_supporting_counter_is_painted_and_free_of_rust';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Brackets_supporting_counter_is_painted_and_free_of_rust',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery22() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL22 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Washbasin_and_counter_edges_are_seale_Photo').setValue(this.imgURL22);
      this.upload22();
    });
  }

  upload22() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save22(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon22 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Washbasin_and_counter_edges_are_seale',
      photourl: this.imgURL22,
      Description: this.ionicForm.get('Washbasin_and_counter_edges_are_seale_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage22(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Washbasin_and_counter_edges_are_seale';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Washbasin_and_counter_edges_are_seale_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Washbasin_and_counter_edges_are_seale',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery23() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL23 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Photo').setValue(this.imgURL23);
      this.upload23();
    });
  }

  upload23() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save23(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon23 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps',
      photourl: this.imgURL23,
      Description: this.ionicForm.get('Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage23(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  /*getGallery24() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL24 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Transition_betweeen_wooden_flooring_and_toilet_at_entry_Photo').setValue(this.imgURL24);
      this.upload24();
    });
  }

  upload24() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save24(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon24 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Transition_betweeen_wooden_flooring_and_toilet_at_entry',
      photourl: this.imgURL24,
      Description: this.ionicForm.get('Transition_betweeen_wooden_flooring_and_toilet_at_entry_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage24(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Transition_betweeen_wooden_flooring_and_toilet_at_entry';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Transition_betweeen_wooden_flooring_and_toilet_at_entry_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Transition_betweeen_wooden_flooring_and_toilet_at_entry',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery25() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL25 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Photo').setValue(this.imgURL25);
      this.upload25();
    });
  }*/

  upload25() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save25(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon25 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional',
      photourl: this.imgURL25,
      Description: this.ionicForm.get('EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage25(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery26() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL26 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Slopes_provided_are_adequate_Photo').setValue(this.imgURL26);
      this.upload26();
    });
  }

  upload26() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save26(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon26 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Slopes_provided_are_adequate',
      photourl: this.imgURL26,
      Description: this.ionicForm.get('Slopes_provided_are_adequate_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage26(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Slopes_provided_are_adequate';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Slopes_provided_are_adequate_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Slopes_provided_are_adequate',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery27() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL27 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Tile_drop_between_dry_and_wet_areas_exists_Photo').setValue(this.imgURL27);
      this.upload27();
    });
  }

  upload27() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save27(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon27 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Tile_drop_between_dry_and_wet_areas_exists',
      photourl: this.imgURL27,
      Description: this.ionicForm.get('Tile_drop_between_dry_and_wet_areas_exists_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage27(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Tile_drop_between_dry_and_wet_areas_exists';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Tile_drop_between_dry_and_wet_areas_exists_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Tiles_are_laid_to_slopewithout_hollowness',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery28() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL28 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('STransition_member_betweeen_wooden_flooring_and_toilet_at_entry_Photo').setValue(this.imgURL28);
      this.upload28();
    });
  }

  upload28() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save28(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon28 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'STransition_member_betweeen_wooden_flooring_and_toilet_at_entry',
      photourl: this.imgURL28,
      Description: this.ionicForm.get('STransition_member_betweeen_wooden_flooring_and_toilet_at_entry_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage28(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'STransition_member_betweeen_wooden_flooring_and_toilet_at_entry';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('STransition_member_betweeen_wooden_flooring_and_toilet_at_entry_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'STransition_member_betweeen_wooden_flooring_and_toilet_at_entry',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery29() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL29 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Tiles_are_laid_to_slope_without_hollowness_Photo').setValue(this.imgURL29);
      this.upload29();
    });
  }

  upload29() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save29(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon29 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Tiles_are_laid_to_slope_without_hollowness',
      photourl: this.imgURL29,
      Description: this.ionicForm.get('Tiles_are_laid_to_slope_without_hollowness_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage29(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Tiles_are_laid_to_slope_without_hollowness';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Tiles_are_laid_to_slope_without_hollowness_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Tiles_are_laid_to_slope_without_hollowness',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery30() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL30 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('EWC_Photo').setValue(this.imgURL30);
      this.upload30();
    });
  }

  upload30() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save30(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon30 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'EWC',
      photourl: this.imgURL30,
      Description: this.ionicForm.get('EWC_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage30(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'EWC';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('EWC_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'EWC',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery31() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL30 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Shower_head_Photo').setValue(this.imgURL30);
      this.upload31();
    });
  }

  upload31() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save31(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon30 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Shower_head',
      photourl: this.imgURL30,
      Description: this.ionicForm.get('Shower_head_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage31(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Shower_head';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Shower_head_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Shower_head',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  /*getGallery31() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL31 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(this.imgURL31);
      this.upload31();
    });
  }

  upload31() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save31(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon31 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL31,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage31(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_wall_and_ceiling_points_are_covered';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Electrical_wall_and_ceiling_points_are_covered',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }*/
  getGallery32() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL32 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Wash_Basin_Photo').setValue(this.imgURL32);
      this.upload32();
    });
  }

  upload32() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save32(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon44 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Wash_Basin',
      photourl: this.imgURL44,
      hight: this.ionicForm.get('Wash_Basin_in_mm').value,
      Description: this.ionicForm.get('Wash_Basin_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });
    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage32(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Wash_Basin';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.hight_in_mm = this.ionicForm.get('Wash_Basin_in_mm').value;
    this.newItem.Description = this.ionicForm.get('Wash_Basin_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Wash_Basin',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery33() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL33 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('False_ceiling_channels_are_consistent_Photo').setValue(this.imgURL33);
      this.upload33();
    });
  }

  upload33() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save33(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon33 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'False_ceiling_channels_are_consistent',
      photourl: this.imgURL33,
      Description: this.ionicForm.get('False_ceiling_channels_are_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage33(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'False_ceiling_channels_are_consistent';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('False_ceiling_channels_are_consistent_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'False_ceiling_channels_are_consistent',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery34() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL34 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Tile_Dado_surface_is_consistent_and_without_hollowness_Photo').setValue(this.imgURL34);
      this.upload34();
    });
  }

  upload34() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save34(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon34 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Tile_Dado_surface_is_consistent_and_without_hollowness',
      photourl: this.imgURL34,
      Description: this.ionicForm.get('Tile_Dado_surface_is_consistent_and_without_hollowness_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage34(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Tile_Dado_surface_is_consistent_and_without_hollowness';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Tile_Dado_surface_is_consistent_and_without_hollowness_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Tile_Dado_surface_is_consistent_and_without_hollowness',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery35() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL35 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Photo').setValue(this.imgURL35);
      this.upload35();
    });
  }

  upload35() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save35(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon35 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges',
      photourl: this.imgURL35,
      Description: this.ionicForm.get('EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage35(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery36() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL36 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Photo').setValue(this.imgURL36);
      this.upload36();
    });
  }

  upload36() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save36(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon36 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Vertical_Tiles_joints_and_ceiling_support_members_are_aligned',
      photourl: this.imgURL36,
      Description: this.ionicForm.get('Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage36(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Vertical_Tiles_joints_and_ceiling_support_members_are_aligned';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Vertical_Tiles_joints_and_ceiling_support_members_are_aligned',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery37() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL37 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Dado_top_line_is_uniform_and_consistent_Photo').setValue(this.imgURL37);
      this.upload37();
    });
  }

  upload37() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save37(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon37 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Dado_top_line_is_uniform_and_consistent',
      photourl: this.imgURL37,
      Description: this.ionicForm.get('Dado_top_line_is_uniform_and_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage37(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Dado_top_line_is_uniform_and_consistent';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Dado_top_line_is_uniform_and_consistent_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Dado_top_line_is_uniform_and_consistent',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery38() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL38 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Service_ledge_is_painted_and_clean_Photo').setValue(this.imgURL38);
      this.upload38();
    });
  }

  upload38() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save38(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon38 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Service_ledge_is_painted_and_clean',
      photourl: this.imgURL38,
      Description: this.ionicForm.get('Service_ledge_is_painted_and_clean_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage38(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Service_ledge_is_painted_and_clean';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Service_ledge_is_painted_and_clean_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Service_ledge_is_painted_and_clean',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery39() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL40 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc_Photo').setValue(this.imgURL40);
      this.upload39();
    });
  }

  upload39() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save39(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon39 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc',
      photourl: this.imgURL39,
      Description: this.ionicForm.get('Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage39(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery40() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL40 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(this.imgURL40);
      this.upload40();
    });
  }

  upload40() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save40(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon40 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL40,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage40(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_wall_and_ceiling_points_are_covered';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Electrical_wall_and_ceiling_points_are_covered',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery41() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL41 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Area_above_false_ceiling_is_painted_Photo').setValue(this.imgURL41);
      this.upload41();
    });
  }

  upload41() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save41(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon41 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Area_above_false_ceiling_is_painted',
      photourl: this.imgURL41,
      Description: this.ionicForm.get('Area_above_false_ceiling_is_painted_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage41(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Area_above_false_ceiling_is_painted';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Area_above_false_ceiling_is_painted_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Area_above_false_ceiling_is_painted',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  getGallery43() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL43 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(this.imgURL43);
      this.upload43();
    });
  }

  upload43() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save43(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon43 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL43,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage43(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_wall_and_ceiling_points_are_covered';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Electrical_wall_and_ceiling_points_are_covered',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery44() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL44 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(this.imgURL44);
      this.upload44();
    });
  }

  upload44() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save44(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon44 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL44,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage44(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_wall_and_ceiling_points_are_covered';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Electrical_wall_and_ceiling_points_are_covered',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery45() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL45 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(this.imgURL45);
      this.upload45();
    });
  }

  upload45() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save45(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon45 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL45,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage45(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_wall_and_ceiling_points_are_covered';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: '',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery46() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.picdata = imageData;
      this.imgURL46 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Photo').setValue(this.imgURL46);
      this.upload46();
    });
  }

  upload46() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  save46(): void {
    this.storage.clear();
    console.log('save clicked');
    this.showicon46 = true;

    this.b2toiletdata.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL46,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('b2toiletdata', JSON.stringify(this.b2toiletdata));
  }
  sendMessage46(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Electrical_wall_and_ceiling_points_are_covered';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Electrical_wall_and_ceiling_points_are_covered',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }

  uid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  //end camer
  submitForm(): void {
    this.issubmit = true;

    const db = firebase.firestore();
    var washingtonRef = db.collection('test1').doc(this.recivedData);
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

    this.AssetData = JSON.stringify(this.b2toiletdata);
    this.DiningData = JSON.parse(this.AssetData);
    console.log('formdata collection', this.DiningData);

    washingtonRef
      .update({
        bedroom2_Toilet: arrayUnion({
          bedroom2_Toilet_data: this.DiningData
        })
      })
      .then(function () {
        console.log('bedroom2_Toilet is  updated');
      });
  }
  exportCSV() {
    this.storageService.setObject('socialdata', this.b2toiletdata);

    var csv = this.papa.unparse(this.b2toiletdata);

    if (this.platform.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'bedroom2_Toilet.csv', csv, { replace: true }).then(
        res => {
          this.socialSharing
            .share(null, null, res.nativeURL, null)
            .then(e => {
              // Success
            })
            .catch(e => {
              console.log('Share failed:', e);
            });
        },
        err => {
          console.log('Error: ', err);
        }
      );
    } else {
      // Dummy implementation for Desktop download purpose
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'bedroom2_Toilet.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  //new end

  UPVC_hardware_is_standard(): void {
    let Qvalue = this.ionicForm.get('UPVC_hardware_is_standard').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay1 = true;
    } else {
      this.cameradisplay1 = false;
    }

    this._cdr.detectChanges();
  }

  Hardware_is_as_per_standard_offering(): void {
    let Qvalue = this.ionicForm.get('Hardware_is_as_per_standard_offering').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay2 = true;
    } else {
      this.cameradisplay2 = false;
    }

    this._cdr.detectChanges();
  }

  Door_frame_and_shutter_shades_are_consistent(): void {
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay3 = true;
    } else {
      this.cameradisplay3 = false;
    }

    this._cdr.detectChanges();
  }

  UPVC_ventilators_are_operable(): void {
    let Qvalue = this.ionicForm.get('UPVC_ventilators_are_operable').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay4 = true;
    } else {
      this.cameradisplay4 = false;
    }

    this._cdr.detectChanges();
  }

  Lock_can_be_operated_from_both_sides(): void {
    let Qvalue = this.ionicForm.get('Lock_can_be_operated_from_both_sides').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay5 = true;
    } else {
      this.cameradisplay5 = false;
    }

    this._cdr.detectChanges();
  }

  Gaskets_or_sealents_are_intact(): void {
    let Qvalue = this.ionicForm.get('Gaskets_or_sealents_are_intact').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay6 = true;
    } else {
      this.cameradisplay6 = false;
    }

    this._cdr.detectChanges();
  }

  Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks(): void {
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay7 = true;
    } else {
      this.cameradisplay7 = false;
    }

    this._cdr.detectChanges();
  }

  Door_frame_and_shutter_gaps_are_consistent(): void {
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_gaps_are_consistent').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay8 = true;
    } else {
      this.cameradisplay8 = false;
    }

    this._cdr.detectChanges();
  }

  Ceiling_electrical_points_are_covered_or_capped_properly(): void {
    let Qvalue = this.ionicForm.get('Ceiling_electrical_points_are_covered_or_capped_properly').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay9 = true;
    } else {
      this.cameradisplay9 = false;
    }

    this._cdr.detectChanges();
  }

  Wall_Light_points_are_covered__or_capped_properly(): void {
    let Qvalue = this.ionicForm.get('Wall_Light_points_are_covered__or_capped_properly').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay10 = true;
    } else {
      this.cameradisplay10 = false;
    }

    this._cdr.detectChanges();
  }

  Switch_plates_are_aligned(): void {
    let Qvalue = this.ionicForm.get('Switch_plates_are_aligned').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay11 = true;
    } else {
      this.cameradisplay11 = false;
    }

    this._cdr.detectChanges();
  }

  All_sockets_or_switches_above_false_ceiling_are_functional(): void {
    let Qvalue = this.ionicForm.get('All_sockets_or_switches_above_false_ceiling_are_functional').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay12 = true;
    } else {
      this.cameradisplay12 = false;
    }

    this._cdr.detectChanges();
  }

  Electrical_points_are_as_per_standard_offering(): void {
    let Qvalue = this.ionicForm.get('Electrical_points_are_as_per_standard_offering').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay13 = true;
    } else {
      this.cameradisplay13 = false;
    }

    this._cdr.detectChanges();
  }

  Exhaust_fan_connection(): void {
    let Qvalue = this.ionicForm.get('Exhaust_fan_connection').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay14 = true;
    } else {
      this.cameradisplay14 = false;
    }

    this._cdr.detectChanges();
  }

  Switches_are_operable(): void {
    let Qvalue = this.ionicForm.get('Switches_are_operable').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay15 = true;
    } else {
      this.cameradisplay15 = false;
    }

    this._cdr.detectChanges();
  }

  Wash_basin_faucet_is_operable(): void {
    let Qvalue = this.ionicForm.get('Wash_basin_faucet_is_operable').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay16 = true;
    } else {
      this.cameradisplay16 = false;
    }

    this._cdr.detectChanges();
  }

  Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust(): void {
    let Qvalue = this.ionicForm.get('Floor_trap_cover_is_provided_and_is_free_of_debris_and_rust').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay17 = true;
    } else {
      this.cameradisplay17 = false;
    }

    this._cdr.detectChanges();
  }

  Floor_trap_below_cover_is_clean(): void {
    let Qvalue = this.ionicForm.get('Floor_trap_below_cover_is_clean').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay18 = true;
    } else {
      this.cameradisplay18 = false;
    }

    this._cdr.detectChanges();
  }

  Shower_head_and_divertor_are_functional(): void {
    let Qvalue = this.ionicForm.get('Shower_head_and_divertor_are_functional').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay19 = true;
    } else {
      this.cameradisplay19 = false;
    }

    this._cdr.detectChanges();
  }

  Health_Faucet_is_functional(): void {
    let Qvalue = this.ionicForm.get('Health_Faucet_is_functional').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay20 = true;
    } else {
      this.cameradisplay20 = false;
    }

    this._cdr.detectChanges();
  }

  Brackets_supporting_counter_is_painted_and_free_of_rust(): void {
    let Qvalue = this.ionicForm.get('Brackets_supporting_counter_is_painted_and_free_of_rust').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay21 = true;
    } else {
      this.cameradisplay21 = false;
    }

    this._cdr.detectChanges();
  }

  Washbasin_and_counter_edges_are_sealed(): void {
    let Qvalue = this.ionicForm.get('Washbasin_and_counter_edges_are_sealed').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay22 = true;
    } else {
      this.cameradisplay22 = false;
    }

    this._cdr.detectChanges();
  }

  Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps(): void {
    let Qvalue = this.ionicForm.get('Granite_counter_is_free_of_sharp_dges_and_fixed_well_without_gaps').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay23 = true;
    } else {
      this.cameradisplay23 = false;
    }

    this._cdr.detectChanges();
  }

  Toilet_Paper_Holder(): void {
    let Qvalue = this.ionicForm.get('Toilet_Paper_Holder').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay24 = true;
    } else {
      this.cameradisplay24 = false;
    }

    this._cdr.detectChanges();
  }

  EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional(): void {
    let Qvalue = this.ionicForm.get('EWC_is_fixed_with_brackets_or_seat_covers_and_is_functional').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay25 = true;
    } else {
      this.cameradisplay25 = false;
    }

    this._cdr.detectChanges();
  }

  Slopes_provided_are_adequate(): void {
    let Qvalue = this.ionicForm.get('Slopes_provided_are_adequate').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay26 = true;
    } else {
      this.cameradisplay26 = false;
    }

    this._cdr.detectChanges();
  }

  Tile_drop_between_dry_and_wet_areas_exists(): void {
    let Qvalue = this.ionicForm.get('Tile_drop_between_dry_and_wet_areas_exists').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay27 = true;
    } else {
      this.cameradisplay27 = false;
    }

    this._cdr.detectChanges();
  }

  Transition_member_betweeen_wooden_flooring_and_toilet_at_entry(): void {
    let Qvalue = this.ionicForm.get('Transition_member_betweeen_wooden_flooring_and_toilet_at_entry').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay28 = true;
    } else {
      this.cameradisplay28 = false;
    }

    this._cdr.detectChanges();
  }

  Tiles_are_laid_to_slope_without_hollowness(): void {
    let Qvalue = this.ionicForm.get('Tiles_are_laid_to_slope_without_hollowness').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay29 = true;
    } else {
      this.cameradisplay29 = false;
    }

    this._cdr.detectChanges();
  }

  EWC(): void {
    let Qvalue = this.ionicForm.get('EWC').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay30 = true;
    } else {
      this.cameradisplay30 = false;
    }

    this._cdr.detectChanges();
  }

  Shower_head(): void {
    let Qvalue = this.ionicForm.get('Shower_head').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay31 = true;
    } else {
      this.cameradisplay31 = false;
    }

    this._cdr.detectChanges();
  }

  Wash_Basin(): void {
    let Qvalue = this.ionicForm.get('Wash_Basin').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay32 = true;
    } else {
      this.cameradisplay32 = false;
    }

    this._cdr.detectChanges();
  }

  False_ceiling_channels_are_consistent(): void {
    let Qvalue = this.ionicForm.get('False_ceiling_channels_are_consistent').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay33 = true;
    } else {
      this.cameradisplay33 = false;
    }

    this._cdr.detectChanges();
  }

  Tile_Dado_surface_is_consistent_and_without_hollowness(): void {
    let Qvalue = this.ionicForm.get('Tile_Dado_surface_is_consistent_and_without_hollowness').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay34 = true;
    } else {
      this.cameradisplay34 = false;
    }

    this._cdr.detectChanges();
  }

  EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges(): void {
    let Qvalue = this.ionicForm.get('EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay35 = true;
    } else {
      this.cameradisplay35 = false;
    }

    this._cdr.detectChanges();
  }

  Vertical_Tiles_joints_and_ceiling_support_members_are_aligned(): void {
    let Qvalue = this.ionicForm.get('Vertical_Tiles_joints_and_ceiling_support_members_are_aligned').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay36 = true;
    } else {
      this.cameradisplay36 = false;
    }

    this._cdr.detectChanges();
  }

  Dado_top_line_is_uniform_and_consistent(): void {
    let Qvalue = this.ionicForm.get('Dado_top_line_is_uniform_and_consistent').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay37 = true;
    } else {
      this.cameradisplay37 = false;
    }

    this._cdr.detectChanges();
  }

  Service_ledge_is_painted_and_clean(): void {
    let Qvalue = this.ionicForm.get('Service_ledge_is_painted_and_clean').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay38 = true;
    } else {
      this.cameradisplay38 = false;
    }

    this._cdr.detectChanges();
  }

  Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc(): void {
    let Qvalue = this.ionicForm.get('Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay39 = true;
    } else {
      this.cameradisplay39 = false;
    }

    this._cdr.detectChanges();
  }

  Consistency_of_corner_beading(): void {
    let Qvalue = this.ionicForm.get('Consistency_of_corner_beading').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay40 = true;
    } else {
      this.cameradisplay40 = false;
    }

    this._cdr.detectChanges();
  }

  Area_above_false_ceiling_is_painted(): void {
    let Qvalue = this.ionicForm.get('Area_above_false_ceiling_is_painted').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay41 = true;
    } else {
      this.cameradisplay41 = false;
    }

    this._cdr.detectChanges();
  }

  Hollowness_in_wall_dado(): void {
    let Qvalue = this.ionicForm.get('Hollowness_in_wall_dado').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay42 = true;
    } else {
      this.cameradisplay42 = false;
    }

    this._cdr.detectChanges();
  }

  notify1() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled1) {
      console.log('true');
      this.isToggled1 = false;
    } else {
      console.log('flase');
      this.isToggled1 = true;
    }
    this._cdr.detectChanges();
  }
  notify2() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled2) {
      console.log('true');
      this.isToggled2 = false;
    } else {
      console.log('flase');
      this.isToggled2 = true;
    }
    this._cdr.detectChanges();
  }

  notify3() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled3) {
      console.log('true');
      this.isToggled3 = false;
    } else {
      console.log('flase');
      this.isToggled3 = true;
    }
    this._cdr.detectChanges();
  }

  notify4() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled4) {
      console.log('true');
      this.isToggled4 = false;
    } else {
      console.log('flase');
      this.isToggled4 = true;
    }
    this._cdr.detectChanges();
  }

  notify5() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled5) {
      console.log('true');
      this.isToggled5 = false;
    } else {
      console.log('flase');
      this.isToggled5 = true;
    }
    this._cdr.detectChanges();
  }

  notify6() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled6) {
      console.log('true');
      this.isToggled6 = false;
    } else {
      console.log('flase');
      this.isToggled6 = true;
    }
    this._cdr.detectChanges();
  }
}
