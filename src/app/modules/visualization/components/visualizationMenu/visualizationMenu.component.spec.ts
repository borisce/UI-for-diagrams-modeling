import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizationMenuComponent } from './visualizationMenu.component';

describe('VisualizationMenuComponent', () => {
  let component: VisualizationMenuComponent;
  let fixture: ComponentFixture<VisualizationMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
