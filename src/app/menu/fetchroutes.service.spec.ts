import { TestBed, inject } from '@angular/core/testing';

import { FetchroutesService } from './fetchroutes.service';

describe('FetchroutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchroutesService]
    });
  });

  it('should be created', inject([FetchroutesService], (service: FetchroutesService) => {
    expect(service).toBeTruthy();
  }));
});
