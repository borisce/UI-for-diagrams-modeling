import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ModalConfirmSettingsActionComponent} from './modal-confirm-settings-action.component';

describe('ModalConfirmSettingsActionComponent', () => {
  let component: ModalConfirmSettingsActionComponent;
  let fixture: ComponentFixture<ModalConfirmSettingsActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmSettingsActionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmSettingsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
