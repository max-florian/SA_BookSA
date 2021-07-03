import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenAdminComponent } from './orden-admin.component';

describe('OrdenAdminComponent', () => {
  let component: OrdenAdminComponent;
  let fixture: ComponentFixture<OrdenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
