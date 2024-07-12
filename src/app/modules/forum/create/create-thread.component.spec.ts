import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateThreadComponent } from './create-thread.component';

describe('CreateThreadComponent', () => {
  let component: CreateThreadComponent;
  let fixture: ComponentFixture<CreateThreadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
