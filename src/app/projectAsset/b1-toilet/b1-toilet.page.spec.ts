import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B1ToiletPage } from './b1-toilet.page';

describe('B1ToiletPage', () => {
  let component: B1ToiletPage;
  let fixture: ComponentFixture<B1ToiletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B1ToiletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B1ToiletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
