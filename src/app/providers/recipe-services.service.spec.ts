import { TestBed, inject } from '@angular/core/testing';

import { RecipeServicesService } from './recipe-services.service';

describe('RecipeServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeServicesService]
    });
  });

  it('should be created', inject([RecipeServicesService], (service: RecipeServicesService) => {
    expect(service).toBeTruthy();
  }));
});
