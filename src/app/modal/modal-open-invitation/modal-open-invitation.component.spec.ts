import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalOpenInvitationComponent } from './modal-open-invitation.component';

describe('ModalOpenInvitationComponent', () => {
  let component: ModalOpenInvitationComponent;
  let fixture: ComponentFixture<ModalOpenInvitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOpenInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpenInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
