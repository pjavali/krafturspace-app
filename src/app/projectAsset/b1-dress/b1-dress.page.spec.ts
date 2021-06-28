import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B1DressPage } from './b1-dress.page';

describe('B1DressPage', () => {
  let component: B1DressPage;
  let fixture: ComponentFixture<B1DressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B1DressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B1DressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
