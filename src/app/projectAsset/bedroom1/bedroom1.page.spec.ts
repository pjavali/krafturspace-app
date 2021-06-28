import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bedroom1Page } from './bedroom1.page';

describe('Bedroom1Page', () => {
  let component: Bedroom1Page;
  let fixture: ComponentFixture<Bedroom1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bedroom1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bedroom1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
