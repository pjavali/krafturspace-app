import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2DressPage } from './b2-dress.page';

describe('B2DressPage', () => {
  let component: B2DressPage;
  let fixture: ComponentFixture<B2DressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2DressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2DressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
