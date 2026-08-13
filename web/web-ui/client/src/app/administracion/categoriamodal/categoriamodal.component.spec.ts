import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriamodalComponent } from './categoriamodal.component';

describe('CategoriamodalComponent', () => {
  let component: CategoriamodalComponent;
  let fixture: ComponentFixture<CategoriamodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriamodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
