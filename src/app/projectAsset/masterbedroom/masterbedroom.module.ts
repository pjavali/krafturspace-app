import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MasterbedroomPage } from './masterbedroom.page';

const routes: Routes = [
  {
    path: '',
    component: MasterbedroomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MasterbedroomPage]
})
export class MasterbedroomPageModule {}
