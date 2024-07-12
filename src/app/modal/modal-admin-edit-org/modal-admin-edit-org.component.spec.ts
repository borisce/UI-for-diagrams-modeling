import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAdminEditOrgComponent } from './modal-admin-edit-org.component';

describe('ModalAdminEditOrgComponent', () => {
  let component: ModalAdminEditOrgComponent;
  let fixture: ComponentFixture<ModalAdminEditOrgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminEditOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminEditOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
