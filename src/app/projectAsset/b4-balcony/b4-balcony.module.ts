import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { B4BalconyPage } from './b4-balcony.page';

const routes: Routes = [
  {
    path: '',
    component: B4BalconyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [B4BalconyPage]
})
export class B4BalconyPageModule {}
