import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {InputOutputTables} from './input-output-tables';

describe('InputandoutputtablesComponent', () => {
  let component: InputOutputTables;
  let fixture: ComponentFixture<InputOutputTables>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputOutputTables]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOutputTables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
