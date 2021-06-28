import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { B1BalconyPage } from './b1-balcony.page';

const routes: Routes = [
  {
    path: '',
    component: B1BalconyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [B1BalconyPage]
})
export class B1BalconyPageModule {}
