import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2ToiletPage } from './b2-toilet.page';

describe('B2ToiletPage', () => {
  let component: B2ToiletPage;
  let fixture: ComponentFixture<B2ToiletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2ToiletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2ToiletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
