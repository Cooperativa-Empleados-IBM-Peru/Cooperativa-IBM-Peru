import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosdetalleComponent } from './certificadosdetalle.component';

describe('CertificadosdetalleComponent', () => {
  let component: CertificadosdetalleComponent;
  let fixture: ComponentFixture<CertificadosdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadosdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
