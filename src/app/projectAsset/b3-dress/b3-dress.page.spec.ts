import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B3DressPage } from './b3-dress.page';

describe('B3DressPage', () => {
  let component: B3DressPage;
  let fixture: ComponentFixture<B3DressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B3DressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B3DressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
