import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemodalComponent } from './deletemodal.component';

describe('DeletemodalComponent', () => {
  let component: DeletemodalComponent;
  let fixture: ComponentFixture<DeletemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
