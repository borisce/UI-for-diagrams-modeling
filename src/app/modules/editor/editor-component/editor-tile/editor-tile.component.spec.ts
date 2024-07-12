import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorTileComponent } from './editor-tile.component';

describe('EditorTileComponent', () => {
  let component: EditorTileComponent;
  let fixture: ComponentFixture<EditorTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
