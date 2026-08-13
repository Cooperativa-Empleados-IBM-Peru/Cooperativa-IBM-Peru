import { TestBed } from '@angular/core/testing';

import { CloudantService } from './cloudant.service';

describe('CloudantService', () => {
  let service: CloudantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
