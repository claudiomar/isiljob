import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobsPage } from './jobs.page';
import { ComponentsModule } from '../../components/components.module';
import { JobsInfoPage } from '../jobs-info/jobs-info.page';
import { JobsInfoPageModule } from '../jobs-info/jobs-info.module';

const routes: Routes = [
  {
    path: '',
    component: JobsPage
  }
];

@NgModule({
  entryComponents:[JobsInfoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    JobsInfoPageModule
  ],
  declarations: [JobsPage]
})
export class JobsPageModule {}
