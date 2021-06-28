import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MToiletPage } from './mtoilet.page';

describe('MToiletPage', () => {
  let component: MToiletPage;
  let fixture: ComponentFixture<MToiletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MToiletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MToiletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
