import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosdetalleComponent } from './prestamosdetalle.component';

describe('PrestamosdetalleComponent', () => {
  let component: PrestamosdetalleComponent;
  let fixture: ComponentFixture<PrestamosdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamosdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
