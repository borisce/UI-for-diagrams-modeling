import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ModalFileNameComponent} from './modal-file-name.component';

describe('ModalFileNameComponent', () => {
  let component: ModalFileNameComponent;
  let fixture: ComponentFixture<ModalFileNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFileNameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
