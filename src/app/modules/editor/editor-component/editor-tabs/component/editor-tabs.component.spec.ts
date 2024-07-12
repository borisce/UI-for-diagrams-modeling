import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EditorTabsComponent} from './editor-tabs.component';

describe('EditorTabsComponent', () => {
  let component: EditorTabsComponent;
  let fixture: ComponentFixture<EditorTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditorTabsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
