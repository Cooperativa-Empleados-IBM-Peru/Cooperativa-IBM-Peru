import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosoperacionComponent } from './prestamosoperacion.component';

describe('PrestamosoperacionComponent', () => {
  let component: PrestamosoperacionComponent;
  let fixture: ComponentFixture<PrestamosoperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamosoperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosoperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
