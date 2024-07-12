import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectFolderComponent } from './modal-select-folder.component';

describe('ModalSelectFolderComponent', () => {
  let component: ModalSelectFolderComponent;
  let fixture: ComponentFixture<ModalSelectFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
