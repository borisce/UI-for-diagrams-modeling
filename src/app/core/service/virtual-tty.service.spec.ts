import { TestBed } from '@angular/core/testing';

import { VirtualTTYService } from './virtual-tty.service';

describe('VirtualTTYService', () => {
  let service: VirtualTTYService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualTTYService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
