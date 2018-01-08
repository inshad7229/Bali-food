import { TestBed, inject } from '@angular/core/testing';

import { GeneralmanagementService } from './generalmanagement.service';

describe('GeneralmanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralmanagementService]
    });
  });

  it('should be created', inject([GeneralmanagementService], (service: GeneralmanagementService) => {
    expect(service).toBeTruthy();
  }));
});
