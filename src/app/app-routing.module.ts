import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'folder', loadChildren: './pages/folder/folder.module#FolderPageModule' },
  { path: 'jobs', loadChildren: './pages/jobs/jobs.module#JobsPageModule' },
  { path: 'register-user', loadChildren: './pages/register-user/register-user.module#RegisterUserPageModule' },
  { path: 'publications', loadChildren: './pages/publications/publications.module#PublicationsPageModule' },
  { path: 'students', loadChildren: './pages/students/students.module#StudentsPageModule' },
  //{ path: 'editar-educacion', loadChildren: './pages/editar-educacion/editar-educacion.module#EditarEducacionPageModule' },
  //{ path: 'editar-experiencia', loadChildren: './pages/editar-experiencia/editar-experiencia.module#EditarExperienciaPageModule' },
  //{ path: 'editar-contacto', loadChildren: './pages/editar-contacto/editar-contacto.module#EditarContactoPageModule' },
  //{ path: 'students-info', loadChildren: './pages/students-info/students-info.module#StudentsInfoPageModule' },
  //{ path: 'publication-info', loadChildren: './pages/publication-info/publication-info.module#PublicationInfoPageModule' },
  //{ path: 'new-folder', loadChildren: './pages/new-folder/new-folder.module#NewFolderPageModule' },
  //{ path: 'jobs-info', loadChildren: './pages/jobs-info/jobs-info.module#JobsInfoPageModule' },
  //{ path: 'folder-info', loadChildren: './pages/folder-info/folder-info.module#FolderInfoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
