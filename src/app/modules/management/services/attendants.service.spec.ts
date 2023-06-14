import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AttendantsService } from './attendants.service';

describe('AttendantsService', () => {
  let service: AttendantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(AttendantsService);
  });


   /**
     * 
     * @returs {*}
     * @membersof AttendantsService
     * @author Daniel Rodriguez
     */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
