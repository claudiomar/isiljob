import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicationsPage } from './publications.page';
import { ComponentsModule } from '../../components/components.module';
import { PublicationInfoPage } from '../publication-info/publication-info.page';
import { PublicationInfoPageModule } from '../publication-info/publication-info.module';

const routes: Routes = [
  {
    path: '',
    component: PublicationsPage
  }
];

@NgModule({
  entryComponents:[PublicationInfoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PublicationInfoPageModule
  ],
  declarations: [PublicationsPage]
})
export class PublicationsPageModule {}
