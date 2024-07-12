import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAdminEditPackageComponent } from './modal-admin-edit-package.component';

describe('ModalAdminEditUserComponent', () => {
  let component: ModalAdminEditPackageComponent;
  let fixture: ComponentFixture<ModalAdminEditPackageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminEditPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminEditPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
