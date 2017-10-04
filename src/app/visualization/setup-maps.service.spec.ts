import { TestBed, inject } from '@angular/core/testing';

import { SetupMapsService } from './setup-maps.service';

describe('SetupMapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetupMapsService]
    });
  });

  it('should be created', inject([SetupMapsService], (service: SetupMapsService) => {
    expect(service).toBeTruthy();
  }));
});
