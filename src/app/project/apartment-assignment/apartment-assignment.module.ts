import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApartmentAssignmentPage } from './apartment-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: ApartmentAssignmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApartmentAssignmentPage]
})
export class ApartmentAssignmentPageModule {}
