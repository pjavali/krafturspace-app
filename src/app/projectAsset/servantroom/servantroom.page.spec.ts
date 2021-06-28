import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServantroomPage } from './servantroom.page';

describe('ServantroomPage', () => {
  let component: ServantroomPage;
  let fixture: ComponentFixture<ServantroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServantroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServantroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
