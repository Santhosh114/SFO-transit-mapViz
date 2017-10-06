import { TestBed, inject } from '@angular/core/testing';

import { DrawRoutepathsService } from './draw-routepaths.service';

describe('DrawRoutepathsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawRoutepathsService]
    });
  });

  it('should be created', inject([DrawRoutepathsService], (service: DrawRoutepathsService) => {
    expect(service).toBeTruthy();
  }));
});
