import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MBalconyPage } from './mbalcony.page';

describe('MBalconyPage', () => {
  let component: MBalconyPage;
  let fixture: ComponentFixture<MBalconyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBalconyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBalconyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
