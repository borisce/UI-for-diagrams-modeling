import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAddTeamMemberComponent } from './modal-add-team-member.component';

describe('ModalAddTeamMemberComponent', () => {
  let component: ModalAddTeamMemberComponent;
  let fixture: ComponentFixture<ModalAddTeamMemberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddTeamMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
