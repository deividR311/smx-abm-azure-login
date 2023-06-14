import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SeasonsService } from './seasons.service';

describe('SeasonsService', () => {
  let service: SeasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(SeasonsService);
  });


   /**
     * 
     * @returs {*}
     * @membersof SeasonsService
     * @author Daniel Rodriguez
     */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
