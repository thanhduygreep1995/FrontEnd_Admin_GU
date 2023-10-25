import { TestBed } from '@angular/core/testing';

import { originService } from './origin.service';

describe('originService', () => {
  let service: originService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(originService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
