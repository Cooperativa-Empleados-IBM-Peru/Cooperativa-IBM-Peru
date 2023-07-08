import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasasinteresComponent } from './tasasinteres.component';

describe('TasasinteresComponent', () => {
  let component: TasasinteresComponent;
  let fixture: ComponentFixture<TasasinteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasasinteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasasinteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
