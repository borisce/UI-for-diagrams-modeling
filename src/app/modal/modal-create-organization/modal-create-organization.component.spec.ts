import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCreateOrganizationComponent } from './modal-create-organization.component';

describe('ModalCreateOrganizationComponent', () => {
  let component: ModalCreateOrganizationComponent;
  let fixture: ComponentFixture<ModalCreateOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateOrganizationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
