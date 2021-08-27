import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApartmentAssignmentPage } from './apartment-assignment.page';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ApartmentAssignmentPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [ApartmentAssignmentPage]
})
export class ApartmentAssignmentPageModule {}
