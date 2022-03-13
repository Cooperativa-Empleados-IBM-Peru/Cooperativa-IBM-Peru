import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasociosComponent } from './listasocios.component';

describe('ListasociosComponent', () => {
  let component: ListasociosComponent;
  let fixture: ComponentFixture<ListasociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
