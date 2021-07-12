import { Component, OnInit } from '@angular/core';
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
import { Camera } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-inspect-detail',
  templateUrl: './inspect-detail.page.html',
  styleUrls: ['./inspect-detail.page.scss'],
})
export class InspectDetailPage implements OnInit {
data:any;
currentId: any;
recivedData:any=[];
picdata:any;
picurl: any;
mypicref:any;
information: any[];
automaticClose = false;
rdata:any=[];
Fnum:any;
Foyer:any[];
CommonToilet:any[];
LivingRoom:any[];
Dining:any[];
Kitchen:any[];
ServantsRoom:any[];
MasterBedRoom:any[];
BedRoom1:any[];
BedRoom2:any[];
BedRoom3:any[];
BedRoom4:any[];


FFoyer:boolean;
CCommonToilet:boolean;

LBalcony:boolean;
LLivingRoom:boolean;

DDining:boolean;
DBalcony:boolean;

KKitchen:boolean;
KUtility:boolean;
KStore:boolean;

SServantsRoom:boolean;
SToilet:boolean;

MMasterBedRoom:boolean;
MBalcony:boolean;
MDress:boolean;
MToilet:boolean;

B1BedRoom:boolean;
B1Balcony:boolean;
B1Dress:boolean;
B1Toilet:boolean;

B2BedRoom:boolean;
B2Balcony:boolean;
B2Dress:boolean;
B2Toilet:boolean;

B3BedRoom:boolean;
B3Balcony:boolean;
B3Dress:boolean;
B3Toilet:boolean;

B4BedRoom:boolean;
B4Balcony:boolean;
B4Dress:boolean;
B4Toilet:boolean;





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

private alertCtrl: AlertController


  ) {
    

     
    this.mypicref=firebase.storage().ref('/')

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;        
        this.currentId=this.data.id;
        console.log("recived data",this.data)    
       

        this.recivedData=this.data;   


      }
    });

    

   }

  

  ngOnInit() {
    this.FFoyer=false;
this.CCommonToilet=false;

this.LBalcony=false;
this.LLivingRoom=false;

this.DDining=false;
this.DBalcony=false;

this.KKitchen=false;
this.KUtility=false;
this.KStore=false;

this.SServantsRoom=false;
this.SToilet=false;

this.MMasterBedRoom=false;
this.MBalcony=false;
this.MDress=false;
this.MToilet=false;

this.B1BedRoom=false;
this.B1Balcony=false;
this.B1Dress=false;
this.B1Toilet=false;

this.B2BedRoom=false;
this.B2Balcony=false;
this.B2Dress=false;
this.B2Toilet=false;

this.B3BedRoom=false;
this.B3Balcony=false;
this.B3Dress=false;
this.B3Toilet=false;

this.B4BedRoom=false;
this.B4Balcony=false;
this.B4Dress=false;
this.B4Toilet=false;




    const db =firebase.firestore();   

    db.collection("test1")
      .doc(this.recivedData)
      .get()
      .then(doc => {
    console.log("all",doc.data()) 
this.rdata=JSON.stringify(doc.data())
console.log("after---json",doc.data().Flat_Number)
this.Fnum=doc.data().Flat_Number;
this.Foyer=doc.data().Foyer;
this.CommonToilet=doc.data().CommonToilet;
this.LivingRoom=doc.data().LivingRoom;
this.Dining=doc.data().Dining;
this.Kitchen=doc.data().Kitchen;
this.ServantsRoom=doc.data().ServantsRoom;
this.MasterBedRoom=doc.data().MasterBedRoom;
this.BedRoom1=doc.data().BedRoom1;
this.BedRoom2=doc.data().BedRoom2;
this.BedRoom3=doc.data().BedRoom3;
this.BedRoom4=doc.data().BedRoom4;
console.log( "data-->",this.Foyer,this.CommonToilet,
this.LivingRoom,this.Dining,this.Kitchen,
this.ServantsRoom,this.MasterBedRoom,
this.BedRoom1,this.BedRoom2,
this.BedRoom3,this.BedRoom4);
console.log("arraylength",doc.data().Dining.length)

if(this.Foyer){
this.FFoyer= true;
}

if(this.CommonToilet){

this.CCommonToilet= true;
}

if(this.LivingRoom){
 this.LLivingRoom =true;

  for(let x = 0; x < this.LivingRoom.length; x++){
    
    if(this.LivingRoom[x]=="Balcony"){
      this.LBalcony=true;
       
    }
   
   console.log("this.LivingRoom->",this.LivingRoom[x])
   console.log("this.LBalcony->",this.LBalcony );
   console.log("this.LLivingRoom->",this.LLivingRoom );
               
  }
}
if(this.Dining){
  this.DDining =true;
  for(let x = 0; x < this.Dining.length; x++){
    
    if(this.Dining[x]=="Balcony"){
      this.DBalcony = true;
    }
    
   console.log("from Dining->",this.Kitchen[x])
   console.log("this.DDining->",this.DDining );
   console.log("this.DBalcony>",this.DBalcony );   
           
  }
}
if(this.Kitchen){
  
  for(let x = 0; x < this.Kitchen.length; x++){
    this.KKitchen =true;
    if(this.Kitchen[x]=="Utility"){
      this.KUtility = true;
    }
    if(this.Kitchen[x]=="Store"){
      this.KStore = true;
    }
   console.log("from kitchen->",this.Kitchen[x])
   console.log("this.KUtility->",this.KUtility );
   console.log("this.KStore>",this.KStore );   
   console.log(" this.KKitchen>", this.KKitchen );         
  }
}

if(this.ServantsRoom){
  this.SServantsRoom =true;
  for(let x = 0; x < this.ServantsRoom.length; x++){
    
    if(this.ServantsRoom[x]=="Toilet"){
      this.SToilet = true;
    }
    
   console.log("from ServantsRoom->",this.ServantsRoom[x])
   console.log("this.SServantsRoom->",this.SServantsRoom );
   console.log("this.SToilet>",this.SToilet );   
          
  }
}

if(this.MasterBedRoom){
 this.MMasterBedRoom =true;
  for(let x = 0; x < this.MasterBedRoom.length; x++){
     
    if(this.MasterBedRoom[x]=="Balcony"){
      this.MBalcony = true;
    }
    if(this.MasterBedRoom[x]=="Dress"){
      this.MDress = true;
    }
    if(this.MasterBedRoom[x]=="Toilet"){
      this.MToilet = true;
    }
   console.log("from MasterBedRoom->",this.MasterBedRoom[x])
   console.log("this.MBalcony->",this.MBalcony );
   console.log("this.MDress>",this.MDress );   
   console.log(" this.MToilet>", this.MToilet );         
  }
}

if(this.BedRoom1){
 this.B1BedRoom =true;
  for(let x = 0; x < this.BedRoom1.length; x++){
     
    if(this.BedRoom1[x]=="Balcony"){
      this.B1Balcony = true;
    }
    if(this.BedRoom1[x]=="Dress"){
      this.B1Dress = true;
    }
    if(this.BedRoom1[x]=="Toilet"){
      this.B1Toilet = true;
    }
   console.log("from BedRoom1->",this.BedRoom1[x])
   console.log("this.B1Balcony->",this.B1Balcony );
   console.log("this.B1Dress>",this.B1Dress );   
   console.log(" this.B1Toilet>", this.B1Toilet );         
  }
}

if(this.BedRoom2){
  this.B2BedRoom =true;
  for(let x = 0; x < this.BedRoom2.length; x++){
    
    if(this.BedRoom2[x]=="Balcony"){
      this.B2Balcony = true;
    }
    if(this.BedRoom2[x]=="Dress"){
      this.B2Dress = true;
    }
    if(this.BedRoom2[x]=="Toilet"){
      this.B2Toilet = true;
    }
   console.log("from BedRoom2->",this.BedRoom2[x])
   console.log("this.B2Balcony->",this.B2Balcony );
   console.log("this.B2Dress>",this.B2Dress );   
   console.log(" this.B2Toilet>", this.B2Toilet );         
  }
}

if(this.BedRoom3){
  this.B3BedRoom =true;
  for(let x = 0; x < this.BedRoom3.length; x++){
    
    if(this.BedRoom3[x]=="Balcony"){
      this.B3Balcony = true;
    }
    if(this.BedRoom3[x]=="Dress"){
      this.B3Dress = true;
    }
    if(this.BedRoom3[x]=="Toilet"){
      this.B3Toilet = true;
    }
   console.log("from BedRoom3->",this.BedRoom3[x])
   console.log("this.B3Balcony->",this.B3Balcony );
   console.log("this.B3Dress>",this.B3Dress );   
   console.log(" this.B3Toilet>", this.B3Toilet );         
  }
}
if(this.BedRoom4){
 this.B4BedRoom =true;
  for(let x = 0; x < this.BedRoom4.length; x++){
     
    if(this.BedRoom4[x]=="Balcony"){
      this.B4Balcony = true;
    }
    if(this.BedRoom4[x]=="Dress"){
      this.B4Dress = true;
    }
    if(this.BedRoom4[x]=="Toilet"){
      this.B4Toilet = true;
    }
   console.log("from BedRoom4->",this.BedRoom4[x])
   console.log("this.B4Balcony->",this.B4Balcony );
   console.log("this.B4Dress>",this.B4Dress );   
   console.log(" this.B4Toilet>", this.B4Toilet );         
  }
};






//end

})


}

Foyerclick(){

  let  senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user:senddata,
                  
            }  
      };
      this.router.navigate(['foyer'],navigationExtras);
      
      

}
CommonToiletclick(){
  let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['c-toilet'],navigationExtras);
  
}

LivingRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['livingroom'],navigationExtras);

}
LBalconyclick(){
 let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['l-balcony'],navigationExtras);

}
DDiningclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['dining'],navigationExtras);
}
DBalconyclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['dbalcony'],navigationExtras);
}
KKitchenclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['kitchen'],navigationExtras);
}
KUtilityclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['kutility'],navigationExtras);
}
KStoreclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['kstore'],navigationExtras);
}

SServantsRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['servantroom'],navigationExtras);
}
SToiletclick(){
   let senddata:any[]=this.recivedData;
  let fn:any[]=this.Fnum
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata
            
                  
            }  
      };
      this.router.navigate(['stoilet'],navigationExtras);
}
MMasterBedRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['masterbedroom'],navigationExtras);
}
MBalconyclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['mbalcony'],navigationExtras);
}
MDressclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['mdress'],navigationExtras);
}
MToiletclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['mtoilet'],navigationExtras);
}
B1BedRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['bedroom1'],navigationExtras);
}
B1Balconyclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b1-balcony'],navigationExtras);
}
B1Dressclick(){
 let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b1-dress'],navigationExtras);
}
B1Toiletclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b1-toilet'],navigationExtras);
}
B2BedRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['bedroom2'],navigationExtras);
}
B2Balconyclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b2-balcony'],navigationExtras);
}
B2Dressclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b2-dress'],navigationExtras);
}
B2Toiletclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b2-toilet'],navigationExtras);
}
B3BedRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['bedroom3'],navigationExtras);
}
B3Balconyclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b3-balcony'],navigationExtras);
}
B3Dressclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b3-dress'],navigationExtras);
}
B3Toiletclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b3-toilet'],navigationExtras);
}
B4BedRoomclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['bedroom4'],navigationExtras);
}
B4Balconyclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b4-balcony'],navigationExtras);
}
B4Dressclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b4-dress'],navigationExtras);
}
B4Toiletclick(){
   let senddata:any[]=this.recivedData;
      let navigationExtras: NavigationExtras = {
            state: {
              user: senddata,
                  
            }  
      };
      this.router.navigate(['b4-toilet'],navigationExtras);
}

}
