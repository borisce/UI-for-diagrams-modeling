import { TestBed } from '@angular/core/testing';

import { VirtualTTYapiService } from './virtual-ttyapi.service';

describe('VirtualTTYapiService', () => {
  let service: VirtualTTYapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualTTYapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
