import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CToiletPage } from './c-toilet.page';

describe('CToiletPage', () => {
  let component: CToiletPage;
  let fixture: ComponentFixture<CToiletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CToiletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CToiletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
