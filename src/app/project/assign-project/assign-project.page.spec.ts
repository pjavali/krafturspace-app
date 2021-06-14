import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProjectPage } from './assign-project.page';

describe('AssignProjectPage', () => {
  let component: AssignProjectPage;
  let fixture: ComponentFixture<AssignProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
