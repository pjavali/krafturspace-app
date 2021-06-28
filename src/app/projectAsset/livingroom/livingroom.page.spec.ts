import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingroomPage } from './livingroom.page';

describe('LivingroomPage', () => {
  let component: LivingroomPage;
  let fixture: ComponentFixture<LivingroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivingroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
