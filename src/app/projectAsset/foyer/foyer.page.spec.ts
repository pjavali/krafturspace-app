import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoyerPage } from './foyer.page';

describe('FoyerPage', () => {
  let component: FoyerPage;
  let fixture: ComponentFixture<FoyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoyerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
