import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenEditorialComponent } from './orden-editorial.component';

describe('OrdenEditorialComponent', () => {
  let component: OrdenEditorialComponent;
  let fixture: ComponentFixture<OrdenEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
