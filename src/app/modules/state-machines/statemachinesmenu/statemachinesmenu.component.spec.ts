import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StateMachinesMenuComponent} from './statemachinesmenu.component';

describe('StateMachinesMenuComponent', () => {
  let component: StateMachinesMenuComponent;
  let fixture: ComponentFixture<StateMachinesMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StateMachinesMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMachinesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
