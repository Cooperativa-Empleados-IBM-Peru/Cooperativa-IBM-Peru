import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilComponent } from './automovil.component';

describe('AutomovilComponent', () => {
  let component: AutomovilComponent;
  let fixture: ComponentFixture<AutomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
