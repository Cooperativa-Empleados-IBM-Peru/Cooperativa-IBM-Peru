import { TestBed } from '@angular/core/testing';

import { UrlImageService } from './url-image.service';

describe('UrlImageService', () => {
  let service: UrlImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
