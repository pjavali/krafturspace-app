import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B4BalconyPage } from './b4-balcony.page';

describe('B4BalconyPage', () => {
  let component: B4BalconyPage;
  let fixture: ComponentFixture<B4BalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B4BalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B4BalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
