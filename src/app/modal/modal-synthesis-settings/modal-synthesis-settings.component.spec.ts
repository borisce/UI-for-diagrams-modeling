import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalSynthesisSettings } from './modal-synthesis-settings.component';

describe('ModalSynthesisSettings', () => {
  let component: ModalSynthesisSettings;
  let fixture: ComponentFixture<ModalSynthesisSettings>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSynthesisSettings]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSynthesisSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
