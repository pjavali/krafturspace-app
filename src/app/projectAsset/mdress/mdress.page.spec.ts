import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDressPage } from './mdress.page';

describe('MDressPage', () => {
  let component: MDressPage;
  let fixture: ComponentFixture<MDressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
