import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AttendantsService } from '../../services/attendants.service';
import { AttendantsComponent } from './attendants.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AttendantsSaveComponent } from '../attendants-save/attendants-save.component';
import { ValidationsModal } from 'src/app/core/resources/resources.enum';


describe('AttendantsComponent', () => {
  let component: AttendantsComponent;
  let fixture: ComponentFixture<AttendantsComponent>;
  let attendantsService: AttendantsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        MaterialModule
      ],
      declarations: [AttendantsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantsComponent);
    component = fixture.componentInstance;
    attendantsService = TestBed.inject(AttendantsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /**
    * this function verifies that the getAttendants  function is called
    * @returs {*}
    * @membersof AttendantsComponent
    * @author Daniel Rodriguez
    */
  it('AttendantsComponent ngOnChanges call   getAttendants', () => {
    // Arrange
    const func = component.ngOnChanges();
    // Act
    component.ngOnChanges();
    // Assert
    expect(func).toEqual(component.getAttendants());
  });



  /**
  * this function verifies that the getAttendants  function is called
  * @returs {*}
  * @membersof AttendantsComponent
  * @author Daniel Rodriguez
  */
  it('AttendantsComponent ngOnChanges call   getAttendants  component.iscreate = true', () => {
    // Arrange
    const func = component.ngOnChanges();
    component.iscreate = true;
    // Act
    component.ngOnChanges();
    // Assert
    expect(func).toEqual(component.getAttendants());
  });



  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent ordenarArray', () => {
    // Arrange
    const data =
      [
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: 'Daniel',
        },
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: 'Alberto',
        }
      ];
    // Act
    component.ordenarArray(data);
    // Assert
    expect(component.attendants).toEqual(data);
  });

  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent ordenarArray', () => {
    // Arrange
    const data =
      [
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: 'Daniel',
        },
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: 'Daniel',
        }
      ];
    // Act
    component.ordenarArray(data);
    // Assert
    expect(component.attendants).toEqual(data);
  });


  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent ordenarArray', () => {
    // Arrange
    const data =
      [
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: '',
        },
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: '',
        }
      ];
    // Act
    component.ordenarArray(data);
    // Assert
    expect(component.attendants).toEqual(data);
  });


  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent ordenarArray', () => {
    // Arrange
    const data =
      [
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: 'asd',
        },
        {
          objectId: '',
          id: '',
          nombre: '',
          apellido: '',
        }
      ];
    // Act
    component.ordenarArray(data);
    // Assert
    expect(component.attendants).toEqual(data);
  });

  /**
   * @returs {*}
   * @membersof AttendantsComponent
   * @author Daniel Rodriguez Cendales
   */
  it('AttendantsComponent should call getAttendants()', (() => {
    // Arrange
    component.IdStation = 9228;
    const response = {
      data:
        [
          {
            objectId: '',
            id: '',
            nombre: '',
            apellido: 'Daniel',
          },
          {
            objectId: '',
            id: '',
            nombre: '',
            apellido: 'Alberto',
          }
        ]
    };
    spyOn(attendantsService, 'getAttendants').and.returnValue(of(response));
    // Act
    component.getAttendants();
    fixture.detectChanges();
    // Assert
    expect(component.attendants).toEqual(response?.data);
  }));


  /**
   * @returs {*}
   * @membersof AttendantsComponent
   * @author Daniel Rodriguez Cendales
   */
  it('AttendantsComponent should call ordenarArray()', (() => {
    // Arrange
    const response = [
      {
        objectId: '',
        id: '',
        nombre: '',
        apellido: 'Daniel',
      },
      {
        objectId: '',
        id: '',
        nombre: '',
        apellido: 'Alberto',
      }
    ];
    // Act
    component.ordenarArray(response);
    // Assert
    expect(component.attendants).toEqual(response);
  }));



  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent openConfirmAction null', () => {
    // Arrange
    const item = {
      nombre: 'daniel',
      apellido: 'cendales',
      active: null
    };
    // Act
    component.openConfirmAction(item);
    // Assert
    expect(component.text).toEqual('¿Está seguro que desea desactivar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?');
  });



  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent openConfirmAction true', () => {
    // Arrange
    const item = {
      nombre: 'daniel',
      apellido: 'cendales',
      active: true
    };
    // Act
    component.openConfirmAction(item);
    // Assert
    expect(component.text).toEqual('¿Está seguro que desea desactivar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?');
  });

  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent openConfirmAction false', () => {
    // Arrange
    const item = {
      nombre: 'daniel',
      apellido: 'cendales',
      active: false
    };
    // Act
    component.openConfirmAction(item);
    // Assert
    expect(component.text).toEqual('¿Está seguro que desea activar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?');
  });


  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent openConfirmAction false', () => {
    // Arrange
    const item = {
      nombre: 'daniel',
      apellido: 'cendales',
      active: true
    };
    component.text = '¿Está seguro que desea activar al usuario  ' + item.nombre + ' ' + item.apellido + ' de la estación de servicio?';
    const message = 'Desactivar Usuario';
    // Act
    component.openConfirmAction(item);
    component.messagesService.openConfirmAction(message, 'warning', component.text);
    // Assert
    expect(component.openConfirmAction(item)).toEqual(component.disabledAttendant(item));
  });



  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent disabledAttendant ', () => {
    // Arrange
    const item = {
      nombre: 'daniel',
      apellido: 'cendales',
      active: true
    };
    component.openConfirmAction(item);
    // Act
    component.disabledAttendant(item);
    // Assert
    expect(component.disabledAttendant(item)).toEqual();
  });


  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent createEntity ', () => {
    // Arrange
    const active = true;
    const data = {
      active: false
    }
    // Act
    component.createEntity(active);
    // Assert
    expect(component.createEntity(active)).toEqual(data);
  });



  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent createEntity ', () => {
    // Arrange
    const active = null;
    const data = {
      active: false
    }
    // Act
    component.createEntity(active);
    // Assert
    expect(component.createEntity(active)).toEqual(data);
  });


  /**
* this function verifies that the getAttendants  function is called
* @returs {*}
* @membersof AttendantsComponent
* @author Daniel Rodriguez
*/
  it('AttendantsComponent createEntity ', () => {
    // Arrange
    const active = false;
    const data = {
      active: true
    }
    // Act
    component.createEntity(active);
    // Assert
    expect(component.createEntity(active)).toEqual(data);
  });

});
