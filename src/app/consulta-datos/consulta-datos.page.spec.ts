import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaDatosPage } from './consulta-datos.page';

describe('ConsultaDatosPage', () => {
  let component: ConsultaDatosPage;
  let fixture: ComponentFixture<ConsultaDatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
