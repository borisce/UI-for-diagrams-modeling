import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorConfigurationComponent } from './editor-configuration.component';

describe('EditorConfigurationComponent', () => {
  let component: EditorConfigurationComponent;
  let fixture: ComponentFixture<EditorConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
