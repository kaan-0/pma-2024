import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaDatosPage } from './consulta-datos.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaDatosPageRoutingModule {}
