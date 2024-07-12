import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiagramGenerationComponent } from './diagram-generation.component';

describe('DiagramGenerationComponent', () => {
  let component: DiagramGenerationComponent;
  let fixture: ComponentFixture<DiagramGenerationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
