import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { B3BalconyPage } from './b3-balcony.page';

const routes: Routes = [
  {
    path: '',
    component: B3BalconyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [B3BalconyPage]
})
export class B3BalconyPageModule {}
