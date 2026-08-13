import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresdetalleComponent } from './proveedoresdetalle.component';

describe('ProveedoresdetalleComponent', () => {
  let component: ProveedoresdetalleComponent;
  let fixture: ComponentFixture<ProveedoresdetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresdetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
