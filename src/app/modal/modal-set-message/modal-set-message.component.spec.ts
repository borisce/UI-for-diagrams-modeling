import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalSetMessageComponent } from './modal-set-message.component';

describe('ModalSetMessageComponent', () => {
  let component: ModalSetMessageComponent;
  let fixture: ComponentFixture<ModalSetMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSetMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
