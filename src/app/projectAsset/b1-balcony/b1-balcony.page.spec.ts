import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B1BalconyPage } from './b1-balcony.page';

describe('B1BalconyPage', () => {
  let component: B1BalconyPage;
  let fixture: ComponentFixture<B1BalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B1BalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B1BalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
