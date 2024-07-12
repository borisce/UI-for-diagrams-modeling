import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalInviteStudentsComponent } from './modal-invite-students.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalInviteStudentsComponent;
  let fixture: ComponentFixture<ModalInviteStudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInviteStudentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInviteStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
