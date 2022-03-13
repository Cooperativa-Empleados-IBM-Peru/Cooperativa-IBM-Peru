import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantizadosComponent } from './garantizados.component';

describe('GarantizadosComponent', () => {
  let component: GarantizadosComponent;
  let fixture: ComponentFixture<GarantizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
