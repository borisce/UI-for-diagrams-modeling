import { TestBed } from '@angular/core/testing';

import { VcdStorageService } from './vcd-storage.service';

describe('VcdStorageService', () => {
  let service: VcdStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcdStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
