import { TestBed } from '@angular/core/testing';

import { TooltipMonacoService } from './tooltip-monaco.service';

describe('TooltipMonacoService', () => {
  let service: TooltipMonacoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TooltipMonacoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
