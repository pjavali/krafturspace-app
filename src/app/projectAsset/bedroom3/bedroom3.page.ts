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

import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { promise } from 'protractor';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

interface StudentData {
  Doors_and_Windows: string;
  UPVC_window_bug_screen_mesh_is_operable: string;
  UPVC_window_bug_screen_mesh_is_operable_Photo: any;
  UPVC_window_bug_screen_mesh_is_operable_Description: string;

  Door_color_is_consistent: string;
  Door_color_is_consistent_Photo: any;
  Door_color_is_consistent_Description: string;

  Gaskets_or_sealents_are_intact: string;
  Gaskets_or_sealents_are_intact_Photo: any;
  Gaskets_or_sealents_are_intact_Description: string;

  UPVC_window_screen_mesh_is_taut: string;
  UPVC_window_screen_mesh_is_taut_Photo: any;
  UPVC_window_screen_mesh_is_taut_Description: string;

  UPVC_hardware_is_as_per_standard: string;
  UPVC_hardware_is_as_per_standard_Photo: any;
  UPVC_hardware_is_as_per_standard_Description: string;

  UPVC_window_glass_is_free_of_scratches: string;
  UPVC_window_glass_is_free_of_scratches_Photo: any;
  UPVC_window_glass_is_free_of_scratches_Description: string;

  UPVC_windows_are_operable: string;
  UPVC_windows_are_operable_Photo: any;
  UPVC_windows_are_operable_Description: string;

  Door_stopper_doesnt_damage_wooden_flooring: string;
  Door_stopper_doesnt_damage_wooden_flooring_Photo: any;
  Door_stopper_doesnt_damage_wooden_flooring_Description: string;

  Door_frame_and_shutter_gaps_are_consistent: string;
  Door_frame_and_shutter_gaps_are_consistent_Photo: any;
  Door_frame_and_shutter_gaps_are_consistent_Description: string;

  Hardware_is_as_per_standard_offering: string;
  Hardware_is_as_per_standard_offering_Photo: any;
  Hardware_is_as_per_standard_offering_Description: string;

  Door_frame_is_consistent_without_dent_or_scratches_or_marks: string;
  Door_frame_is_consistent_without_dent_or_scratches_or_marks_Photo: any;
  Door_frame_is_consistent_without_dent_or_scratches_or_marks_Description: string;

  Electrical: string;
  Switches_are_operable: string;
  Switches_are_operable_Photo: any;
  Switches_are_operable_Description: string;

  Electrical_points_are_as_per_standard_offering: string;
  Electrical_points_are_as_per_standard_offering_Photo: any;
  Electrical_points_are_as_per_standard_offering_Description: string;

  Switch_plates_are_aligned: string;
  Switch_plates_are_aligned_Photo: any;
  Switch_plates_are_aligned_Description: string;

  AC_Core_cut_pipe_is_finished_flush_with_plaster: string;
  AC_Core_cut_pipe_is_finished_flush_with_plaster_Photo: any;
  AC_Core_cut_pipe_is_finished_flush_with_plaster_Description: string;

  AC_Core_cut_pipe_is_cleaned: string;
  AC_Core_cut_pipe_is_cleaned_Photo: any;
  AC_Core_cut_pipe_is_cleaned_Description: string;

  Ceiling_electrical_points_are_covered_or_capped_properly: string;
  Ceiling_electrical_points_are_covered_or_capped_properly_Photo: any;
  Ceiling_electrical_points_are_covered_or_capped_properly_Description: string;

  Wall_Light_points_are_covered__or_capped_properly: string;
  Wall_Light_points_are_covered__or_capped_properly_Photo: any;
  Wall_Light_points_are_covered__or_capped_properly_Description: string;

  Flooring: string;

  Wooden_flooring_is_fixed_and_consistent: string;
  Wooden_flooring_is_fixed_and_consistent_Photo: any;
  Wooden_flooring_is_fixed_and_consistent_Description: string;

  Skirting_finish_and_alignment: string;
  Skirting_finish_and_alignment_Photo: any;
  Skirting_finish_and_alignment_Description: string;

  Transition_betweeen_wooden_flooring_and_toilet: string;
  Transition_betweeen_wooden_flooring_and_toilet_Photo: any;
  Transition_betweeen_wooden_flooring_and_toilet_Description: string;

  Transition_betweeen_Corridor_marble_and_wooden_flooring: string;
  Transition_betweeen_Corridor_marble_and_wooden_flooring_Photo: any;
  Transition_betweeen_Corridor_marble_and_wooden_flooring_Description: string;

  Walls_and_ceiling: string;

  Cornices_provided_are_aligned: string;
  Cornices_provided_are_aligned_Photo: any;
  Cornices_provided_are_aligned_Description: string;

  Ceilings_are_free_of_stains_or_undulations_or_cracks_etc: string;
  Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Photo: any;
  Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description: string;

  Walls_are_free_of_cracks_or_stains_etc: string;
  Walls_are_free_of_cracks_or_stains_etc_Photo: any;
  Walls_are_free_of_cracks_or_stains_etc_Description: string;
}

@Component({
  selector: 'app-bedroom3',
  templateUrl: './bedroom3.page.html',
  styleUrls: ['./bedroom3.page.scss']
})
export class Bedroom3Page implements OnInit {
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
  bedroom3data: any[] = [];
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

  isSave = false;

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

  isenabled: boolean = true;
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

    db.collection('Krafturspace1')
      .doc(this.recivedData)
      .get()
      .then(doc => {
        console.log('all', doc.data().Flat_Number);
        this.flatnumber = doc.data().Flat_Number;
      });
    //new

    this.ionicForm = this.formBuilder.group({
      Doors_and_Windows: [''],
      UPVC_window_bug_screen_mesh_is_operable_and_taut: ['', [Validators.required]],
      UPVC_window_bug_screen_mesh_is_operable_and_taut_Photo: [],
      UPVC_window_bug_screen_mesh_is_operable_and_taut_Description: [''],

      Door_frame_and_shutter_shades_are_consistent: [''],
      Door_frame_and_shutter_shades_are_consistent_Photo: [],
      Door_frame_and_shutter_shades_are_consistent_Description: [''],

      Gaskets_or_sealents_are_intact: [''],
      Gaskets_or_sealents_are_intact_Photo: [],
      Gaskets_or_sealents_are_ntact_Description: [''],

      UPVC_window_screen_mesh_is_taut: [''],
      UPVC_window_screen_mesh_is_taut_Photo: [],
      UPVC_window_screen_mesh_is_taut_Description: [''],

      UPVC_hardware_is_as_per_standard: [''],
      UPVC_hardware_is_as_per_standard_Photo: [],
      UPVC_hardware_is_as_per_standard_Description: [''],

      UPVC_window_glass_is_free_of_scratches: [''],
      UPVC_window_glass_is_free_of_scratches_Photo: [],
      UPVC_window_glass_is_free_of_scratches_Description: [''],

      UPVC_windows_are_operable: [''],
      UPVC_windows_are_operable_Photo: [],
      UPVC_windows_are_operable_Description: [''],

      Door_stopper_is_operable: ['', [Validators.required]],
      Door_stopper_is_operable_Photo: [],
      Door_stopper_is_operable_Description: [''],

      Door_frame_and_hutter_gaps_are_consistent_on_both_sides: [''],
      Door_frame_and_hutter_gaps_are_consistent_on_both_sides_Photo: [],
      Door_frame_and_hutter_gaps_are_consistent_on_both_sides_Description: [''],

      Hardware_is_as_per_standard_offering: [''],
      Hardware_is_as_per_standard_offering_Photo: [''],
      Hardware_is_as_per_standard_offering_Description: [''],

      Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks: [''],
      Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Photo: [''],
      Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Description: [''],

      Electrical: [''],
      Switches_are_operable: [''],
      Switches_are_operable_Photo: [''],
      Switches_are_operable_Description: [''],

      Electrical_points_are_as_per_standard_offering: [''],
      Electrical_points_are_as_per_standard_offering_Photo: [''],
      Electrical_points_are_as_per_standard_offering_Description: [''],

      Switch_plates_are_aligned: [''],
      Switch_plates_are_aligned_Photo: [''],
      Switch_plates_are_aligned_Description: [''],

      AC_Core_cut_pipe_is_finished_flush_with_plaster: [''],
      AC_Core_cut_pipe_is_finished_flush_with_plaster_Photo: [''],
      AC_Core_cut_pipe_is_finished_flush_with_plaster_Description: [''],

      AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides: [''],
      AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides_Photo: [''],
      AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides_Description: [''],

      Ceiling_and_wall_electrical_points_are_covered_or_capped_properly: [''],
      Ceiling_and_wall_electrical_points_are_covered_or_capped_properly_Photo: [''],
      Ceiling_and_wall_electrical_points_are_covered_or_capped_properly_Description: [''],

      Wall_Light_points_are_covered__or_capped_properly: [''],
      Wall_Light_points_are_covered__or_capped_properly_Photo: [''],
      Wall_Light_points_are_covered__or_capped_properly_Description: [''],

      Flooring: [''],

      Wooden_flooring_is_fixed_and_consistent_without_gaps: [''],

      Wooden_flooring_is_fixed_and_consistent_without_gaps_Photo: [''],

      Wooden_flooring_is_fixed_and_consistent_without_gaps_Description: [''],

      Skirting_is_finished_and_aligned_without_gaps: [''],
      Skirting_is_finished_and_aligned_without_gaps_Photo: [''],
      Skirting_is_finished_and_aligned_without_gaps_Description: [''],

      Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right: [''],
      Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right_Photo: [''],
      Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right_Description: [''],

      Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right: [''],
      Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right_Photo: [''],
      Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right_Description: [''],

      Walls_and_ceiling: [''],

      Cornices_provided_are_aligned: [''],
      Cornices_provided_are_aligned_Photo: [''],
      Cornices_provided_are_aligned_Description: [''],

      Ceilings_are_free_of_stains_or_undulations_or_cracks_etc: [''],
      Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Photo: [''],
      Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description: [''],

      Walls_are_free_of_cracks_or_stains_etc: ['', [Validators.required]],
      Walls_are_free_of_cracks_or_stains_etc_Photo: [''],
      Walls_are_free_of_cracks_or_stains_etc_Description: ['']
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
      this.ionicForm.get('UPVC_window_bug_screen_mesh_is_operable_and_taut_Photo').setValue(this.imgURL1);
      this.upload1();
    });
  }

  upload1() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save1(): void {
    console.log('Save clicked');
    this.showicon1 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      project_Name: this.project_Name,
      Project_Type: this.Project_Type,
      project_Address: this.project_Address,
      Flat_Number: this.Flat_Number,
      inpect_title: 'UPVC_window_bug_screen_mesh_is_operable_and_taut',
      photourl: this.picdata,
      Description: this.ionicForm.get('UPVC_window_bug_screen_mesh_is_operable_and_taut_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage1(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'UPVC_window_bug_screen_mesh_is_operable_and_taut';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('UPVC_window_bug_screen_mesh_is_operable_and_taut_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'j.prajwal@gmail.com',
      cc: 'j.prajwal@gmail.com',
      attachments: [],
      subject: 'UPVC_window_bug_screen_mesh_is_operable_and_taut',
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
      this.imgURL2 = 'data:image/jpeg;base64,' + imageData;
      this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent_Photo').setValue(this.imgURL2);
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

  Save2(): void {
    console.log('Save clicked');
    this.showicon3 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_points_are_as_per_standard_offering',
      photourl: this.imgURL3,
      Description: this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage2() {
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
      this.ionicForm.get('Gaskets_or_sealents_are_intact_Photo').setValue(this.imgURL3);
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

  Save3(): void {
    console.log('Save clicked');
    this.showicon3 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Gaskets_or_sealents_are_intact',
      photourl: this.imgURL3,
      Description: this.ionicForm.get('Gaskets_or_sealents_are_intact_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage3() {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Gaskets_or_sealents_are_intact';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Gaskets_or_sealents_are_intact_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem1(this.newItem).then(item => {
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
      this.ionicForm.get('Aluminium_channel_below_balcony_door_is_cleaned_Photo').setValue(this.imgURL4);
      this.upload4();
    });
  }

  upload4() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save4(): void {
    console.log('Save clicked');
    this.showicon4 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Aluminium_channel_below_balcony_door_is_cleaned',
      photourl: this.imgURL4,
      Description: this.ionicForm.get('Aluminium_channel_below_balcony_door_is_cleaned_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage4(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Aluminium_channel_below_balcony_door_is_cleaned';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Aluminium_channel_below_balcony_door_is_cleaned_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Aluminium_channel_below_balcony_door_is_cleaned',
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
      this.ionicForm.get('UPVC_hardware_is_as_per_standard()_Photo').setValue(this.imgURL5);
      this.upload5();
    });
  }

  upload5() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save5(): void {
    console.log('Save clicked');
    this.showicon5 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'UPVC_hardware_is_as_per_standard()',
      photourl: this.imgURL5,
      Description: this.ionicForm.get('UPVC_hardware_is_as_per_standard()_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage5(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'UPVC_hardware_is_as_per_standard()';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('UPVC_hardware_is_as_per_standard()_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'UPVC_hardware_is_as_per_standard()',
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
      this.ionicForm.get('UPVC_window_glass_is_free_of_scratches_Photo').setValue(this.imgURL6);
      this.upload6();
    });
  }

  upload6() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save6(): void {
    console.log('Save clicked');
    this.showicon6 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'UPVC_window_glass_is_free_of_scratches',
      photourl: this.imgURL6,
      Description: this.ionicForm.get('UPVC_window_glass_is_free_of_scratches_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage6(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'UPVC_window_glass_is_free_of_scratches';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('UPVC_window_glass_is_free_of_scratches_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'UPVC_window_glass_is_free_of_scratches',
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
      this.ionicForm.get('UPVC_windows_are_operable_Photo').setValue(this.imgURL7);
      this.upload7();
    });
  }

  upload7() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save7(): void {
    console.log('Save clicked');
    this.showicon7 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'UPVC_windows_are_operable',
      photourl: this.imgURL7,
      Description: this.ionicForm.get('UPVC_windows_are_operable_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage7(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'UPVC_windows_are_operable';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('UPVC_windows_are_operable_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'UPVC_windows_are_operable',
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
      this.ionicForm.get('Door_stopper_is_operable_Photo').setValue(this.imgURL8);
      this.upload8();
    });
  }

  upload8() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save8(): void {
    console.log('Save clicked');
    this.showicon8 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Door_stopper_is_operable',
      photourl: this.imgURL8,
      Description: this.ionicForm.get('Door_stopper_is_operable_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage8(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Door_stopper_is_operable';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Door_stopper_is_operable_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Door_stopper_is_operable',
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
      this.ionicForm.get('Door_frame_and_hutter_gaps_are_consistent_on_both_sides_Photo').setValue(this.imgURL9);
      this.upload9();
    });
  }

  upload9() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save9(): void {
    console.log('Save clicked');
    this.showicon9 = true;
    9;
    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Door_frame_and_hutter_gaps_are_consistent_on_both_sides',
      photourl: this.imgURL9,
      Description: this.ionicForm.get('Door_frame_and_hutter_gaps_are_consistent_on_both_sides_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage9(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Door_frame_and_hutter_gaps_are_consistent_on_both_sides';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Door_frame_and_hutter_gaps_are_consistent_on_both_sides_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Door_frame_and_hutter_gaps_are_consistent_on_both_sides',
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
      this.ionicForm.get('Hardware_is_as_per_standard_offering_Photo').setValue(this.imgURL10);
      this.upload10();
    });
  }

  upload10() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save10(): void {
    console.log('Save clicked');
    this.showicon10 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Hardware_is_as_per_standard_offering',
      photourl: this.imgURL10,
      Description: this.ionicForm.get('Hardware_is_as_per_standard_offering_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage10(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Hardware_is_as_per_standard_offering';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Hardware_is_as_per_standard_offering_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
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
      this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Photo').setValue(this.imgURL11);
      this.upload11();
    });
  }

  upload11() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save11() {
    console.log('Save clicked');
    this.showicon11 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks',
      photourl: this.imgURL11,
      Description: this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage11() {
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
      this.ionicForm.get('Switches_are_operable_Photo').setValue(this.imgURL12);
      this.upload12();
    });
  }

  upload12() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save12() {
    console.log('Save clicked');
    this.showicon12 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Switches_are_operable',
      photourl: this.imgURL12,
      Description: this.ionicForm.get('Switches_are_operable_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage12(): void {
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

  Save13(): void {
    console.log('Save clicked');
    this.showicon13 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_points_are_as_per_standard_offering',
      photourl: this.imgURL13,
      Description: this.ionicForm.get('Electrical_points_are_as_per_standard_offering_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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
      this.ionicForm.get('Switch_plates_are_aligned_Photo').setValue(this.imgURL14);
      this.upload14();
    });
  }

  upload14() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save14(): void {
    console.log('Save clicked');
    this.showicon14 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Switch_plates_are_aligned',
      photourl: this.imgURL14,
      Description: this.ionicForm.get('Switch_plates_are_aligned_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage14(): void {
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
      this.ionicForm.get('Skirting_finish_and_alignment_Photo').setValue(this.imgURL15);
      this.upload15();
    });
  }

  upload15() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save15(): void {
    console.log('Save clicked');
    this.showicon15 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Skirting_finish_and_alignment',
      photourl: this.imgURL15,
      Description: this.ionicForm.get('Skirting_finish_and_alignment_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage15(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Skirting_finish_and_alignment';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Skirting_finish_and_alignment_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Skirting_finish_and_alignment',
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
      this.ionicForm.get('AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides_Photo').setValue(this.imgURL16);
      this.upload16();
    });
  }

  upload16() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save16(): void {
    console.log('Save clicked');
    this.showicon16 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides',
      photourl: this.imgURL16,
      Description: this.ionicForm.get('AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage16(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides',
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
      this.ionicForm.get('Ceiling_and_wall_electrical_points_are_covered_or_capped_properly_Photo').setValue(this.imgURL17);
      this.upload17();
    });
  }

  upload17() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save17(): void {
    console.log('Save clicked');
    this.showicon17 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Ceiling_and_wall_electrical_points_are_covered_or_capped_properly',
      photourl: this.imgURL17,
      Description: this.ionicForm.get('Ceiling_and_wall_electrical_points_are_covered_or_capped_properly_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage17(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Ceiling_and_wall_electrical_points_are_covered_or_capped_properly';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Ceiling_and_wall_electrical_points_are_covered_or_capped_properly_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Ceiling_and_wall_electrical_points_are_covered_or_capped_properly',
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
      this.ionicForm.get('SS_pipe_railing_end_caps_are_fixed_without_gaps_Photo').setValue(this.imgURL18);
      this.upload18();
    });
  }

  upload18() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save18(): void {
    console.log('Save clicked');
    this.showicon18 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'SS_pipe_railing_end_caps_are_fixed_without_gaps',
      photourl: this.imgURL18,
      Description: this.ionicForm.get('SS_pipe_railing_end_caps_are_fixed_without_gaps_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage18(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'SS_pipe_railing_end_caps_are_fixed_without_gaps';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('SS_pipe_railing_end_caps_are_fixed_without_gaps_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'SS_pipe_railing_end_caps_are_fixed_without_gaps',
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
      this.ionicForm.get('Wooden_flooring_is_fixed_and_consistent_without_gaps_Photo').setValue(this.imgURL19);
      this.upload19();
    });
  }

  upload19() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save19(): void {
    console.log('Save clicked');
    this.showicon19 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Wooden_flooring_is_fixed_and_consistent_without_gaps',
      photourl: this.imgURL19,
      Description: this.ionicForm.get('Wooden_flooring_is_fixed_and_consistent_without_gaps_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage19(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Wooden_flooring_is_fixed_and_consistent_without_gaps';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Wooden_flooring_is_fixed_and_consistent_without_gaps_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Wooden_flooring_is_fixed_and_consistent_without_gaps',
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
      this.ionicForm.get('Skirting_is_finished_and_aligned_without_gaps_Photo').setValue(this.imgURL20);
      this.upload20();
    });
  }

  upload20() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save20(): void {
    console.log('Save clicked');
    this.showicon20 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Skirting_is_finished_and_aligned_without_gaps',
      photourl: this.imgURL20,
      Description: this.ionicForm.get('Skirting_is_finished_and_aligned_without_gaps_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage20(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Skirting_is_finished_and_aligned_without_gaps';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Skirting_is_finished_and_aligned_without_gaps_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Skirting_is_finished_and_aligned_without_gaps',
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
      this.ionicForm.get('Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right_Photo').setValue(this.imgURL21);
      this.upload21();
    });
  }

  upload21() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save21(): void {
    console.log('Save clicked');
    this.showicon21 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right',
      photourl: this.imgURL21,
      Description: this.ionicForm.get('Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage21(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right',
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
      this.ionicForm.get('Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right_Photo').setValue(this.imgURL22);
      this.upload22();
    });
  }

  upload22() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save22(): void {
    console.log('Save clicked');
    this.showicon22 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right',
      photourl: this.imgURL22,
      Description: this.ionicForm.get('Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage22(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right',
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
      this.ionicForm.get('Cornices_provided_are_aligned_Photo').setValue(this.imgURL23);
      this.upload23();
    });
  }

  upload23() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save23(): void {
    console.log('Save clicked');
    this.showicon23 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Cornices_provided_are_aligned',
      photourl: this.imgURL23,
      Description: this.ionicForm.get('Cornices_provided_are_aligned_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage23(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Cornices_provided_are_aligned';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Cornices_provided_are_aligned_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Cornices_provided_are_aligned',
      body: [JSON.stringify(this.newItem)],
      isHtml: true
    };

    this.emailComposer.open(email);
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
  }
  getGallery24() {
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
      this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Photo').setValue(this.imgURL24);
      this.upload24();
    });
  }

  upload24() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save24(): void {
    console.log('Save clicked');
    this.showicon24 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Ceilings_are_free_of_stains_or_undulations_or_cracks_etc',
      photourl: this.imgURL24,
      Description: this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage24(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Ceilings_are_free_of_stains_or_undulations_or_cracks_etc';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Ceilings_are_free_of_stains_or_undulations_or_cracks_etc',
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
      this.ionicForm.get('Walls_are_free_of_cracks_or_stains_etc_Photo').setValue(this.imgURL25);
      this.upload25();
    });
  }

  upload25() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save25(): void {
    console.log('Save clicked');
    this.showicon25 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Walls_are_free_of_cracks_or_stains_etc',
      photourl: this.imgURL25,
      Description: this.ionicForm.get('Walls_are_free_of_cracks_or_stains_etc_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage25(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Walls_are_free_of_cracks_or_stains_etc';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Walls_are_free_of_cracks_or_stains_etc_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Walls_are_free_of_cracks_or_stains_etc',
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
      this.ionicForm.get('Internal_surfaces_is_cleaned_and_painted_Photo').setValue(this.imgURL26);
      this.upload26();
    });
  }

  upload26() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save26(): void {
    console.log('Save clicked');
    this.showicon26 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Internal_surfaces_is_cleaned_and_painted',
      photourl: this.imgURL26,
      Description: this.ionicForm.get('Internal_surfaces_is_cleaned_and_painted_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage26(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Internal_surfaces_is_cleaned_and_painted';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Internal_surfaces_is_cleaned_and_painted_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Internal_surfaces_is_cleaned_and_painted',
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
      this.ionicForm.get('Shaft_internals_to_be_painted_Photo').setValue(this.imgURL27);
      this.upload27();
    });
  }

  upload27() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save27(): void {
    console.log('Save clicked');
    this.showicon27 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Shaft_internals_to_be_painted',
      photourl: this.imgURL27,
      Description: this.ionicForm.get('Shaft_internals_to_be_painted_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage27(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Shaft_internals_to_be_painted';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Shaft_internals_to_be_painted_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Shaft_internals_to_be_painted',
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
      this.ionicForm.get('Drip_moulds_in_ceiling_are_consistent_Photo').setValue(this.imgURL28);
      this.upload28();
    });
  }

  upload28() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save28(): void {
    console.log('Save clicked');
    this.showicon28 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Drip_moulds_in_ceiling_are_consistent',
      photourl: this.imgURL28,
      Description: this.ionicForm.get('Drip_moulds_in_ceiling_are_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage28(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Drip_moulds_in_ceiling_are_consistent';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Drip_moulds_in_ceiling_are_consistent_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Drip_moulds_in_ceiling_are_consistent',
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
      this.ionicForm.get('Walls_are_free_of_cracks_or__stains_etc_Photo').setValue(this.imgURL29);
      this.upload29();
    });
  }

  upload29() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save29(): void {
    console.log('Save clicked');
    this.showicon29 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Walls_are_free_of_cracks_or__stains_etc',
      photourl: this.imgURL29,
      Description: this.ionicForm.get('Walls_are_free_of_cracks_or__stains_etc_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage29(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Walls_are_free_of_cracks_or__stains_etc';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Walls_are_free_of_cracks_or__stains_etc_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Walls_are_free_of_cracks_or__stains_etc',
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
      this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Photo').setValue(this.imgURL30);
      this.upload30();
    });
  }

  upload30() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save30(): void {
    console.log('Save clicked');
    this.showicon30 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Ceilings_are_free_of_stains_or_undulations_or_cracks_etc',
      photourl: this.imgURL30,
      Description: this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage30(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Ceilings_are_free_of_stains_or_undulations_or_cracks_etc';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Ceilings_are_free_of_stains_or_undulations_or_cracks_etc',
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
      this.ionicForm.get('Elevational_ledge_horizontal_surface_finish_Photo').setValue(this.imgURL30);
      this.upload31();
    });
  }

  upload31() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save31(): void {
    console.log('Save clicked');
    this.showicon30 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Elevational_ledge_horizontal_surface_finish',
      photourl: this.imgURL30,
      Description: this.ionicForm.get('Elevational_ledge_horizontal_surface_finish_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage31(): void {
    this.newItem.user = this.au.email;
    this.newItem.inpect_title = 'Elevational_ledge_horizontal_surface_finish';
    //this.newItem1.photourl = this.imgURL1;
    this.newItem.Description = this.ionicForm.get('Elevational_ledge_horizontal_surface_finish_Description').value;
    this.newItem.timestamp = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

    let email: any = {
      app: 'gmail',
      to: 'krafturspace@gmail.com',
      cc: 'sumathi@kraft-urspace.com',
      attachments: [],
      subject: 'Elevational_ledge_horizontal_surface_finish',
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

 Save31(): void {
   
   console.log('Save clicked');
   this.showicon31 = true;

   this.bedroom3data.push({
     id: Date.now(),
     user: this.au.email,
     inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
     photourl: this.imgURL31,
     Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
     timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
   });

   //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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
      this.ionicForm.get('Dado_top_line_is_uniform_and_consistent_Photo').setValue(this.imgURL32);
      this.upload32();
    });
  }

  upload32() {
    var ref = this.mypicref.child(this.uid()).child('Electrical' + '.png');
    ref.putString(this.picdata, 'base64', { contentType: 'image/png' }).then(savedPicture => {
      ref.getDownloadURL().then(function (downloadURL) {});
    });
  }

  Save32(): void {
    console.log('Save clicked');
    this.showicon32 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Dado_top_line_is_uniform_and_consistent',
      photourl: this.imgURL32,
      Description: this.ionicForm.get('Dado_top_line_is_uniform_and_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
  }
  sendMessage32(): void {
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

  Save33(): void {
    console.log('Save clicked');
    this.showicon33 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'False_ceiling_channels_are_consistent',
      photourl: this.imgURL33,
      Description: this.ionicForm.get('False_ceiling_channels_are_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save34(): void {
    console.log('Save clicked');
    this.showicon34 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Tile_Dado_surface_is_consistent_and_without_hollowness',
      photourl: this.imgURL34,
      Description: this.ionicForm.get('Tile_Dado_surface_is_consistent_and_without_hollowness_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save35(): void {
    console.log('Save clicked');
    this.showicon35 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges',
      photourl: this.imgURL35,
      Description: this.ionicForm.get('EWC_Ledge_wall_granite_coping_is_free_of_sharp_edges_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save36(): void {
    console.log('Save clicked');
    this.showicon36 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Vertical_Tiles_joints_and_ceiling_support_members_are_aligned',
      photourl: this.imgURL36,
      Description: this.ionicForm.get('Vertical_Tiles_joints_and_ceiling_support_members_are_aligned_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save37(): void {
    console.log('Save clicked');
    this.showicon37 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Dado_top_line_is_uniform_and_consistent',
      photourl: this.imgURL37,
      Description: this.ionicForm.get('Dado_top_line_is_uniform_and_consistent_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save38(): void {
    console.log('Save clicked');
    this.showicon38 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Service_ledge_is_painted_and_clean',
      photourl: this.imgURL38,
      Description: this.ionicForm.get('Service_ledge_is_painted_and_clean_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save39(): void {
    console.log('Save clicked');
    this.showicon39 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc',
      photourl: this.imgURL39,
      Description: this.ionicForm.get('Ceiling_tiles_are_free_of_stains_or_undulations_or_cracks_or_hollowness_etc_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save40(): void {
    console.log('Save clicked');
    this.showicon40 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL40,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save41(): void {
    console.log('Save clicked');
    this.showicon41 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Area_above_false_ceiling_is_painted',
      photourl: this.imgURL41,
      Description: this.ionicForm.get('Area_above_false_ceiling_is_painted_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save43(): void {
    console.log('Save clicked');
    this.showicon43 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL43,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save44(): void {
    console.log('Save clicked');
    this.showicon44 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL44,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save45(): void {
    console.log('Save clicked');
    this.showicon45 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL45,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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

  Save46(): void {
    console.log('Save clicked');
    this.showicon46 = true;

    this.bedroom3data.push({
      id: Date.now(),
      user: this.au.email,
      inpect_title: 'Electrical_wall_and_ceiling_points_are_covered',
      photourl: this.imgURL46,
      Description: this.ionicForm.get('Electrical_wall_and_ceiling_points_are_covered_Description').value,
      timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    });

    //console.log('bedroom3data', JSON.stringify(this.bedroom3data));
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
    var washingtonRef = db.collection('Krafturspace1').doc(this.recivedData);
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

    this.AssetData = JSON.stringify(this.bedroom3data);
    this.DiningData = JSON.parse(this.AssetData);
    console.log('formdata collection', this.DiningData);

    washingtonRef
      .update({
        BedRoom3: arrayUnion({
          BedRoom3_data: this.DiningData
        })
      })
      .then(function () {
        console.log('BedRoom3 is  updated');
        this.isenabled = false;
      });
  }
  exportCSV() {
    this.storageService.setObject('socialdata', this.bedroom3data);

    var csv = this.papa.unparse(this.bedroom3data);

    if (this.platform.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'BedRoom3_data.csv', csv, { replace: true }).then(
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
      a.download = 'BedRoom3_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  //new end

  UPVC_window_bug_screen_mesh_is_operable_and_taut(): void {
    let Qvalue = this.ionicForm.get('UPVC_window_bug_screen_mesh_is_operable_and_taut').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay1 = true;
    } else {
      this.cameradisplay1 = false;
    }

    this._cdr.detectChanges();
  }

  Door_frame_and_shutter_shades_are_consistent(): void {
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_shades_are_consistent').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay2 = true;
    } else {
      this.cameradisplay2 = false;
    }

    this._cdr.detectChanges();
  }

  Gaskets_or_sealents_are_intact(): void {
    let Qvalue = this.ionicForm.get('Gaskets_or_sealents_are_intact').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay3 = true;
    } else {
      this.cameradisplay3 = false;
    }

    this._cdr.detectChanges();
  }

  UPVC_window_screen_mesh_is_taut(): void {
    let Qvalue = this.ionicForm.get('UPVC_window_screen_mesh_is_taut').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay4 = true;
    } else {
      this.cameradisplay4 = false;
    }

    this._cdr.detectChanges();
  }

  UPVC_hardware_is_as_per_standard(): void {
    let Qvalue = this.ionicForm.get('UPVC_hardware_is_as_per_standard()').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay5 = true;
    } else {
      this.cameradisplay5 = false;
    }

    this._cdr.detectChanges();
  }

  UPVC_window_glass_is_free_of_scratches(): void {
    let Qvalue = this.ionicForm.get('UPVC_window_glass_is_free_of_scratches').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay6 = true;
    } else {
      this.cameradisplay6 = false;
    }

    this._cdr.detectChanges();
  }

  UPVC_windows_are_operable(): void {
    let Qvalue = this.ionicForm.get('UPVC_windows_are_operable').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay7 = true;
    } else {
      this.cameradisplay7 = false;
    }
  }

  Door_stopper_is_operable(): void {
    let Qvalue = this.ionicForm.get('Door_stopper_is_operable').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay8 = true;
    } else {
      this.cameradisplay8 = false;
    }

    this._cdr.detectChanges();
  }

  Door_frame_and_hutter_gaps_are_consistent_on_both_sides(): void {
    let Qvalue = this.ionicForm.get('Door_frame_and_hutter_gaps_are_consistent_on_both_sides').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay9 = true;
    } else {
      this.cameradisplay9 = false;
    }

    this._cdr.detectChanges();
  }

  Hardware_is_as_per_standard_offering(): void {
    let Qvalue = this.ionicForm.get('Hardware_is_as_per_standard_offering').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay10 = true;
    } else {
      this.cameradisplay10 = false;
    }

    this._cdr.detectChanges();
  }

  Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks(): void {
    let Qvalue = this.ionicForm.get('Door_frame_and_shutter_doesnot_have_dent_or_scratches_or_marks').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay11 = true;
    } else {
      this.cameradisplay11 = false;
    }

    this._cdr.detectChanges();
  }

  Switches_are_operable(): void {
    let Qvalue = this.ionicForm.get('Switches_are_operable').value;
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

  Switch_plates_are_aligned(): void {
    let Qvalue = this.ionicForm.get('Switch_plates_are_aligned').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay14 = true;
    } else {
      this.cameradisplay14 = false;
    }

    this._cdr.detectChanges();
  }

  AC_Core_cut_pipe_is_finished_flush_with_plaster(): void {
    let Qvalue = this.ionicForm.get('AC_Core_cut_pipe_is_finished_flush_with_plaster').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay15 = true;
    } else {
      this.cameradisplay15 = false;
    }

    this._cdr.detectChanges();
  }

  AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides(): void {
    let Qvalue = this.ionicForm.get('AC_Core_cut_pipe_is_cleaned_and_finished_flush_with_plaster_on_both_sides').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay16 = true;
    } else {
      this.cameradisplay16 = false;
    }

    this._cdr.detectChanges();
  }

  Ceiling_and_wall_electrical_points_are_covered_or_capped_properly(): void {
    let Qvalue = this.ionicForm.get('Ceiling_and_wall_electrical_points_are_covered_or_capped_properly').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay17 = true;
    } else {
      this.cameradisplay17 = false;
    }

    this._cdr.detectChanges();
  }

  Wall_Light_points_are_covered__or_capped_properly(): void {
    let Qvalue = this.ionicForm.get('Wall_Light_points_are_covered__or_capped_properly').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay18 = true;
    } else {
      this.cameradisplay18 = false;
    }

    this._cdr.detectChanges();
  }

  Wooden_flooring_is_fixed_and_consistent_without_gaps(): void {
    let Qvalue = this.ionicForm.get('Wooden_flooring_is_fixed_and_consistent_without_gaps').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay19 = true;
    } else {
      this.cameradisplay19 = false;
    }

    this._cdr.detectChanges();
  }

  Skirting_finish_and_alignment(): void {
    let Qvalue = this.ionicForm.get('Skirting_finish_and_alignment').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay20 = true;
    } else {
      this.cameradisplay20 = false;
    }

    this._cdr.detectChanges();
  }

  Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right(): void {
    let Qvalue = this.ionicForm.get('Transition_member_betweeen_wooden_flooring_and_toilet_is_provided_and_fixed_right').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay21 = true;
    } else {
      this.cameradisplay21 = false;
    }

    this._cdr.detectChanges();
  }

  Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right(): void {
    let Qvalue = this.ionicForm.get('Transition_member_betweeen_Corridor_marble_and_wooden_flooring_is_provided_and_fixed_right').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay22 = true;
    } else {
      this.cameradisplay22 = false;
    }

    this._cdr.detectChanges();
  }

  Cornices_provided_are_aligned(): void {
    let Qvalue = this.ionicForm.get('Cornices_provided_are_aligned').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay23 = true;
    } else {
      this.cameradisplay23 = false;
    }

    this._cdr.detectChanges();
  }

  Ceilings_are_free_of_stains_or_undulations_or_cracks_etc(): void {
    let Qvalue = this.ionicForm.get('Ceilings_are_free_of_stains_or_undulations_or_cracks_etc').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay24 = true;
    } else {
      this.cameradisplay24 = false;
    }

    this._cdr.detectChanges();
  }

  Walls_are_free_of_cracks_or_stains_etc(): void {
    let Qvalue = this.ionicForm.get('Walls_are_free_of_cracks_or_stains_etc').value;
    console.log('Q---->', Qvalue);
    if (Qvalue === 'No') {
      this.cameradisplay25 = true;
    } else {
      this.cameradisplay25 = false;
    }

    this._cdr.detectChanges();
  }

  notify() {
    console.log('Toggled: ' + this.isToggled);

    if (this.isToggled) {
      console.log('true');
      this.isToggled = false;
    } else {
      console.log('flase');
      this.isToggled = true;
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
}
