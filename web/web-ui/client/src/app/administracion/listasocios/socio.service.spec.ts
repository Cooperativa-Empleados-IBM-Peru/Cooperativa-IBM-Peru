import { TestBed } from '@angular/core/testing';

import { SocioService } from './socio.service';

describe('SocioService', () => {
  let service: SocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
