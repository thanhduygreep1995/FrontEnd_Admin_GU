import { TestBed } from '@angular/core/testing';

import { SpecService } from './Spec.service';

describe('SpecService', () => {
  let service: SpecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
