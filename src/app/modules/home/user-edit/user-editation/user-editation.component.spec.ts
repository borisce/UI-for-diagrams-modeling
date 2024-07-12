import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserEditationComponent } from './user-editation.component';

describe('UserEditationComponent', () => {
  let component: UserEditationComponent;
  let fixture: ComponentFixture<UserEditationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
