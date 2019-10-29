import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FolderPage } from './folder.page';
import { ComponentsModule } from '../../components/components.module';
import { FolderInfoPage } from '../folder-info/folder-info.page';
import { FolderInfoPageModule } from '../folder-info/folder-info.module';
import { NewFolderPage } from '../new-folder/new-folder.page';
import { NewFolderPageModule } from '../new-folder/new-folder.module';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  }
];

@NgModule({
  entryComponents:[FolderInfoPage, NewFolderPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FolderInfoPageModule,
    NewFolderPageModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
