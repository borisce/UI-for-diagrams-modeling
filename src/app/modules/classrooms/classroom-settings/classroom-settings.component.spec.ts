import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClassroomSettingsComponent } from './classroom-settings.component';

describe('ClassroomComponent', () => {
  let component: ClassroomSettingsComponent;
  let fixture: ComponentFixture<ClassroomSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
