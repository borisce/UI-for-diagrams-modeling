import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalShareRepoComponent } from './modal-share-repo.component';

describe('ModalShareRepoComponent', () => {
  let component: ModalShareRepoComponent;
  let fixture: ComponentFixture<ModalShareRepoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShareRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShareRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
