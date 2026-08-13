import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosdetalleComponent } from './ahorrosdetalle.component';

describe('AhorrosdetalleComponent', () => {
  let component: AhorrosdetalleComponent;
  let fixture: ComponentFixture<AhorrosdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhorrosdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorrosdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
