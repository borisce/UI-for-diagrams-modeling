import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorVisualisationToolComponent } from './editor-visualisation-tool.component';

describe('EditorVisualisationToolComponent', () => {
  let component: EditorVisualisationToolComponent;
  let fixture: ComponentFixture<EditorVisualisationToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorVisualisationToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorVisualisationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
