import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalTransferOwnershipComponent } from './modal-transfer-ownership.component';

describe('ModalTransferOwnershipComponent', () => {
  let component: ModalTransferOwnershipComponent;
  let fixture: ComponentFixture<ModalTransferOwnershipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTransferOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTransferOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
