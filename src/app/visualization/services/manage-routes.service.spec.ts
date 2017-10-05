import { TestBed, inject } from '@angular/core/testing';

import { ManageRoutesService } from './manage-routes.service';

describe('ManageRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageRoutesService]
    });
  });

  it('should be created', inject([ManageRoutesService], (service: ManageRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
