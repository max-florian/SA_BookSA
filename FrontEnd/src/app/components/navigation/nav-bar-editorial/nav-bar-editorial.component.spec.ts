import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarEditorialComponent } from './nav-bar-editorial.component';

describe('NavBarEditorialComponent', () => {
  let component: NavBarEditorialComponent;
  let fixture: ComponentFixture<NavBarEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
