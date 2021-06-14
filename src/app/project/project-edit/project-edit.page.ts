import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { AlertController} from '@ionic/angular';
import FormJson from 'src/assets/simple_form.json';



 export interface Options {
        label?: string;
        placeholder?: string;
        required?: boolean;
        type?: string;
        children?:Array<FormControlObject>;
    }

    export interface FormControlObject {
        key: string;
        type: string;
        options:Options;
    }
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {
  
myForm: FormGroup;
simpleForm =FormJson;

  constructor(private fb: FormBuilder, private alertCtrl:AlertController) {
   console.log(this.simpleForm);
   this.myForm = this.fb.group({});

   this.createControls(this.simpleForm);
  } 

  createControls( controls:Array<FormControlObject>){
    for (let control of controls){
      const newFormControl= new FormControl();

      if (control.options.required){
       
      }

        this.myForm.addControl(control.key, newFormControl);

    }
        console.log("my form", this.myForm);
  }

  async submitForm() {
    const alert = await this.alertCtrl.create({
      header:'your form',
      message: JSON.stringify(this.myForm.value),
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
