import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DBalconyPage } from './dbalcony.page';

describe('DBalconyPage', () => {
  let component: DBalconyPage;
  let fixture: ComponentFixture<DBalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DBalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DBalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
