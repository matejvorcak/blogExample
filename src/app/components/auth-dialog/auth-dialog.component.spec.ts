/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthDialogComponet } from './auth-dialog.component';

describe('DialogComponent', () => {
  let component: AuthDialogComponet;
  let fixture: ComponentFixture<AuthDialogComponet>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDialogComponet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDialogComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
