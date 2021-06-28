import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bedroom3Page } from './bedroom3.page';

describe('Bedroom3Page', () => {
  let component: Bedroom3Page;
  let fixture: ComponentFixture<Bedroom3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bedroom3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bedroom3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
