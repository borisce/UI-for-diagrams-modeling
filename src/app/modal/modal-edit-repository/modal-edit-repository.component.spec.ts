import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEditRepositoryComponent } from './modal-edit-repository.component';

describe('ModalEditRepositoryComponent', () => {
  let component: ModalEditRepositoryComponent;
  let fixture: ComponentFixture<ModalEditRepositoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
