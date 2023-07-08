import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteimagenComponent } from './deleteimagen.component';

describe('DeleteimagenComponent', () => {
  let component: DeleteimagenComponent;
  let fixture: ComponentFixture<DeleteimagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteimagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
