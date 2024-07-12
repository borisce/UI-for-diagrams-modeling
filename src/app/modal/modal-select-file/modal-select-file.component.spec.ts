import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectFileComponent } from './modal-select-file.component';

describe('ModalSelectFileComponent', () => {
  let component: ModalSelectFileComponent;
  let fixture: ComponentFixture<ModalSelectFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
