import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { B3ToiletPage } from './b3-toilet.page';

const routes: Routes = [
  {
    path: '',
    component: B3ToiletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [B3ToiletPage]
})
export class B3ToiletPageModule {}
