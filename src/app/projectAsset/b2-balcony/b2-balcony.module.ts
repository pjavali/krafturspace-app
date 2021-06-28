import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { B2BalconyPage } from './b2-balcony.page';

const routes: Routes = [
  {
    path: '',
    component: B2BalconyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [B2BalconyPage]
})
export class B2BalconyPageModule {}
