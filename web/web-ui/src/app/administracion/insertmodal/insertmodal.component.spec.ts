import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertmodalComponent } from './insertmodal.component';

describe('InsertmodalComponent', () => {
  let component: InsertmodalComponent;
  let fixture: ComponentFixture<InsertmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
