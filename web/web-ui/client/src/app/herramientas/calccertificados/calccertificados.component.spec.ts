import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalccertificadosComponent } from './calccertificados.component';

describe('CalccertificadosComponent', () => {
  let component: CalccertificadosComponent;
  let fixture: ComponentFixture<CalccertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalccertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalccertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
