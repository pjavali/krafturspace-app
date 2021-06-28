import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InspectDetailPage } from 'src/app/project/inspect-detail/inspect-detail.page';



const routes: Routes = [
  {
    path: '',
    component: InspectDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
     
  ],
  declarations: [InspectDetailPage]
})
export class InspectDetailPageModule {}
