import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverlay } from './menu-overlay';

describe('MenuOverlay', () => {
  let component: MenuOverlay;
  let fixture: ComponentFixture<MenuOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
