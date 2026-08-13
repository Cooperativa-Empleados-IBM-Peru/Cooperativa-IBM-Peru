import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertproveedorComponent } from './insertproveedor.component';

describe('InsertproveedorComponent', () => {
  let component: InsertproveedorComponent;
  let fixture: ComponentFixture<InsertproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertproveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
