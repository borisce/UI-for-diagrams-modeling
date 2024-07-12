import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEditOrgMemberComponent } from './modal-edit-org-member.component';

describe('ModalEditOrgMemberComponent', () => {
  let component: ModalEditOrgMemberComponent;
  let fixture: ComponentFixture<ModalEditOrgMemberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditOrgMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditOrgMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
