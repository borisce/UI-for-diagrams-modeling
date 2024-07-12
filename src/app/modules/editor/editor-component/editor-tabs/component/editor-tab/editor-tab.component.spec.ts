import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorTabComponent } from './editor-tab.component';

describe('EditorTabComponent', () => {
  let component: EditorTabComponent;
  let fixture: ComponentFixture<EditorTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
