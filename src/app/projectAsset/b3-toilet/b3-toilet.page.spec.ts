import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B3ToiletPage } from './b3-toilet.page';

describe('B3ToiletPage', () => {
  let component: B3ToiletPage;
  let fixture: ComponentFixture<B3ToiletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B3ToiletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B3ToiletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
