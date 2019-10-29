import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { TrabajoComponent } from './trabajo/trabajo.component';




@NgModule({
  declarations: [
    HeaderComponent, TrabajosComponent , TrabajoComponent
  ],
  exports:[
    HeaderComponent,TrabajosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
