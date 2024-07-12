import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAdminEditUserComponent } from './modal-admin-edit-user.component';

describe('ModalAdminEditUserComponent', () => {
  let component: ModalAdminEditUserComponent;
  let fixture: ComponentFixture<ModalAdminEditUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
