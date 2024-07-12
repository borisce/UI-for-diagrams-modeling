import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClassroomCardComponent} from './classroom-card.component';

describe('ClassroomCardComponent', () => {
  let component: ClassroomCardComponent;
  let fixture: ComponentFixture<ClassroomCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
