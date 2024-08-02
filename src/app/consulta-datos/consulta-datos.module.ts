import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaDatosPageRoutingModule } from './consulta-datos-routing.module';

import { ConsultaDatosPage } from './consulta-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaDatosPageRoutingModule
  ],
  declarations: [ConsultaDatosPage]
})
export class ConsultaDatosPageModule {}
