import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRemoveTeamMemberComponent } from './modal-remove-team-member.component';

describe('ModalRemoveTeamMemberComponent', () => {
  let component: ModalRemoveTeamMemberComponent;
  let fixture: ComponentFixture<ModalRemoveTeamMemberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRemoveTeamMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRemoveTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
