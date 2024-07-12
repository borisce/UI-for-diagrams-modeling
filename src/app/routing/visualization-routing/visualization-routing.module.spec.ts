import { VisualizationRoutingModule } from './visualization-routing.module';

describe('VisualizationRoutingModule', () => {
  let visualizationRoutingModule: VisualizationRoutingModule;

  beforeEach(() => {
    visualizationRoutingModule = new VisualizationRoutingModule();
  });

  it('should create an instance', () => {
    expect(visualizationRoutingModule).toBeTruthy();
  });
});
