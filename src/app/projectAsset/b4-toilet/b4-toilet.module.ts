import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { B4ToiletPage } from './b4-toilet.page';

const routes: Routes = [
  {
    path: '',
    component: B4ToiletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [B4ToiletPage]
})
export class B4ToiletPageModule {}
