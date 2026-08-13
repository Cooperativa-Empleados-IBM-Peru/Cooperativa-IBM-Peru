import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcpagosComponent } from './calcpagos.component';

describe('CalcpagosComponent', () => {
  let component: CalcpagosComponent;
  let fixture: ComponentFixture<CalcpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcpagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
