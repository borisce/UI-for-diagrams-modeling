import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StudentCardComponent} from './student-card.component';

describe('StudentCardComponent', () => {
  let component: StudentCardComponent;
  let fixture: ComponentFixture<StudentCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
