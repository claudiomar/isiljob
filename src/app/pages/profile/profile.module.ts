import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ComponentsModule } from '../../components/components.module';
import { EditarContactoPage } from '../editar-contacto/editar-contacto.page';
import { EditarContactoPageModule } from '../editar-contacto/editar-contacto.module';
import { EditarEducacionPage } from '../editar-educacion/editar-educacion.page';
import { EditarExperienciaPage } from '../editar-experiencia/editar-experiencia.page';
import { EditarEducacionPageModule } from '../editar-educacion/editar-educacion.module';
import { EditarExperienciaPageModule } from '../editar-experiencia/editar-experiencia.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  entryComponents:[ EditarContactoPage, EditarEducacionPage , EditarExperienciaPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    EditarContactoPageModule,
    EditarEducacionPageModule,
    EditarExperienciaPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
