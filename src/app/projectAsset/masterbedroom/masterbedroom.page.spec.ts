import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterbedroomPage } from './masterbedroom.page';

describe('MasterbedroomPage', () => {
  let component: MasterbedroomPage;
  let fixture: ComponentFixture<MasterbedroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterbedroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterbedroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
