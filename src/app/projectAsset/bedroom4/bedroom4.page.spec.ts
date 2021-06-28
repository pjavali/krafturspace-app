import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bedroom4Page } from './bedroom4.page';

describe('Bedroom4Page', () => {
  let component: Bedroom4Page;
  let fixture: ComponentFixture<Bedroom4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bedroom4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bedroom4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
