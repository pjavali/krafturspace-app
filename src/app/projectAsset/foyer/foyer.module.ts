import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoyerPage } from './foyer.page';

const routes: Routes = [
  {
    path: '',
    component: FoyerPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],

  declarations: [FoyerPage]
})
export class FoyerPageModule {}
