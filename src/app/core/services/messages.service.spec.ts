import { TestBed } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { MessagesService } from './messages.service';


describe('MessagesService', () => {
    let service: MessagesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MessagesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


      /**
   * @returs {*}
   * @membersof AttendantsSaveComponent
   * @author Daniel Rodriguez Cendales
   */
  it('openMesaggeTop ', () => {
    // Arrange
    // Act
    const func = Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '',
        showConfirmButton: false,
        timer: 6500
    })
    // Assert
    expect(service.openMesaggeTop()).toEqual();
  });

});
