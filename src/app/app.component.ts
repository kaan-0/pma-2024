import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'apps' },
    { title: 'Estaciones', url: '/consulta', icon: 'pulse' },
    
  ];
  
  constructor() {}
}
