import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalPutCredentialsComponent } from './modal-put-credentials.component';

describe('ModalPutCredentialsComponent', () => {
  let component: ModalPutCredentialsComponent;
  let fixture: ComponentFixture<ModalPutCredentialsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPutCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPutCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
