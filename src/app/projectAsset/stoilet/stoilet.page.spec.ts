import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SToiletPage } from './stoilet.page';

describe('SToiletPage', () => {
  let component: SToiletPage;
  let fixture: ComponentFixture<SToiletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SToiletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SToiletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
