import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignPage } from './edit-assign.page';

describe('EditAssignPage', () => {
  let component: EditAssignPage;
  let fixture: ComponentFixture<EditAssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
