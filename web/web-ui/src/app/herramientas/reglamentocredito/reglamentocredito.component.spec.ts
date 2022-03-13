import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentocreditoComponent } from './reglamentocredito.component';

describe('ReglamentocreditoComponent', () => {
  let component: ReglamentocreditoComponent;
  let fixture: ComponentFixture<ReglamentocreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglamentocreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglamentocreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
