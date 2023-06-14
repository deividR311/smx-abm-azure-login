import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  /**
    * @returs {*}
    * @membersof AttendantsSaveComponent
    * @author Daniel Rodriguez Cendales
    */
  it('openSpinner ', () => {
    // Arrange
    // Act
    const func = service.spinner.show();
    // Assert
    expect(service.openSpinner()).toEqual();
  });

  /**
   * @returs {*}
   * @membersof AttendantsSaveComponent
   * @author Daniel Rodriguez Cendales
   */
  it('closeSpinner ', () => {
    // Arrange
    // Act
    const func = service.spinner.show();
    // Assert
    expect(service.closeSpinner()).toEqual();
  });
});
