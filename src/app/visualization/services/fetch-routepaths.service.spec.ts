import { TestBed, inject } from '@angular/core/testing';

import { FetchRoutepathsService } from './fetch-routepaths.service';

describe('FetchRoutepathsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchRoutepathsService]
    });
  });

  it('should be created', inject([FetchRoutepathsService], (service: FetchRoutepathsService) => {
    expect(service).toBeTruthy();
  }));
});
