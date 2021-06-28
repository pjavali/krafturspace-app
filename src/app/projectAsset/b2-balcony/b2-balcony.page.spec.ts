import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2BalconyPage } from './b2-balcony.page';

describe('B2BalconyPage', () => {
  let component: B2BalconyPage;
  let fixture: ComponentFixture<B2BalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2BalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
