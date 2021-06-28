import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LBalconyPage } from './l-balcony.page';

describe('LBalconyPage', () => {
  let component: LBalconyPage;
  let fixture: ComponentFixture<LBalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LBalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LBalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
