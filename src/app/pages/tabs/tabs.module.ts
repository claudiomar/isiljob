import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'profile',
        loadChildren:'../profile/profile.module#ProfilePageModule'
      },
      {
        path:'folder',
        loadChildren:'../folder/folder.module#FolderPageModule'
      },
      {
        path:'jobs',
        loadChildren:'../jobs/jobs.module#JobsPageModule'
      },
      {
        path:'register-user',
        loadChildren:'../register-user/register-user.module#RegisterUserPageModule'
      },
      {
        path:'publications',
        loadChildren:'../publications/publications.module#PublicationsPageModule'
      },
      {
        path:'students',
        loadChildren:'../students/students.module#StudentsPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
