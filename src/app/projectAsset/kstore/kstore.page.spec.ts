import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KStorePage } from './kstore.page';

describe('KStorePage', () => {
  let component: KStorePage;
  let fixture: ComponentFixture<KStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KStorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
