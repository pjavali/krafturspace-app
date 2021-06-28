import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bedroom2Page } from './bedroom2.page';

describe('Bedroom2Page', () => {
  let component: Bedroom2Page;
  let fixture: ComponentFixture<Bedroom2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bedroom2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bedroom2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
