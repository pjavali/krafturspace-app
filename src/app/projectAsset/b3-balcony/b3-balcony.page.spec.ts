import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B3BalconyPage } from './b3-balcony.page';

describe('B3BalconyPage', () => {
  let component: B3BalconyPage;
  let fixture: ComponentFixture<B3BalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B3BalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B3BalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
