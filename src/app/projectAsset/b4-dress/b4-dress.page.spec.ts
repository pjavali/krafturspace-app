import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B4DressPage } from './b4-dress.page';

describe('B4DressPage', () => {
  let component: B4DressPage;
  let fixture: ComponentFixture<B4DressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B4DressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B4DressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
