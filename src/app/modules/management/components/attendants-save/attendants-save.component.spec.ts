import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MSALGuardConfigFactory, MSALInstanceFactory } from 'src/app/app.module';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { ValidationsModal } from 'src/app/core/resources/resources.enum';
import { MessagesService } from 'src/app/core/services/messages.service';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AttendantsService } from '../../services/attendants.service';
import { SeasonsService } from '../../services/seasons.service';
import { AttendantsSaveComponent } from './attendants-save.component';

describe('AttendantsSaveComponent', () => {
  let component: AttendantsSaveComponent;
  let fixture: ComponentFixture<AttendantsSaveComponent>;
  let seasonsService: SeasonsService;
  let messagesService: MessagesService;
  let attendantsService: AttendantsService;
  let authMsalService: AuthMsalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        MaterialModule,
        ReactiveFormsModule,
        MsalModule,
        NoopAnimationsModule
      ],
      providers: [
        TranslateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        AuthMsalService,
        { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true, },
        { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory, },
        { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
        { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSAL_INTERCEPTOR_CONFIG, },
        MsalService,
        MsalGuard,
        MsalBroadcastService
      ],
      declarations: [AttendantsSaveComponent],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantsSaveComponent);
    component = fixture.componentInstance;
    attendantsService = TestBed.inject(AttendantsService);
    seasonsService = TestBed.inject(SeasonsService);
    messagesService = TestBed.inject(MessagesService);
    authMsalService = TestBed.inject(AuthMsalService);
    fixture.detectChanges();
  });


  /**
   * @returs {*}
   * @membersof AttendantsSaveComponent
   * @author Daniel Rodriguez Cendales
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('should require valid form', () => {
    component.attendantForm.setValue({
      rut: '1234567',
      name: 'daniel',
      lastname: 'rodriguez',
      ideess: '9228',
      id: ''
    });
    expect(component.attendantForm.valid).toEqual(false);
  });


  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('should require valid form', () => {
    component.attendantForm.setValue({
      rut: '',
      name: '',
      lastname: '',
      ideess: '',
      id: ''
    });
    expect(component.attendantForm.valid).toEqual(false);
  });

  /**
   * @returs {*}
   * @membersof AttendantsSaveComponent
   * @author Daniel Rodriguez Cendales
   */
  it('AttendantsSaveComponent should call getSeasons()', (() => {
    // Arrange
    component.infouser = 9228;
    const response = {
      status: true,
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
    spyOn(seasonsService, 'getSeasons').and.returnValue(of(response));
    // Act
    component.getSeasons();
    fixture.detectChanges();
    // Assert
    expect(component.estaciones).toEqual(response?.data);
  }));

  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('closeModal', () => {
    // Arrange
    const func = component.dialog.closeAll();
    // Act
    component.closeModal();
    // Assert
    expect(component.closeModal()).toEqual(func);
  });


  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('createEntity save', () => {
    // Arrange
    component.save = ValidationsModal.Save;
    // Act
    let data = {
      nombre: '',
      apellido: '',
      ideess: '',
    }
    // Assert
    expect(component.createEntity()).toEqual(data);
  });

  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('createEntity update', () => {
    // Arrange
    component.save = ValidationsModal.Update;
    // Act
    let data = {
      nombre: '',
      apellido: '',
      ideess: '',
    }
    // Assert
    expect(component.createEntity()).toEqual(data);
  });



  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('openConfirmAction ', () => {
    // Arrange
    const func = component.closeModal();
    // Act
    // Assert
    expect(component.openConfirmAction()).toEqual(func);
  });



  /**
 * @returs {*}
 * @membersof AttendantsSaveComponent
 * @author Daniel Rodriguez Cendales
 */
  it('setValueData edit options ValidationsModal.Save ', () => {
    // Arrange
    component.update = ValidationsModal.Save;
    // Act
    component.data.validation = ValidationsModal.Update;
    // Assert
    expect(component.setValueData()).toEqual()
  });

  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('setValueData edit options ValidationsModal.Update', () => {
    // Arrange
    component.update = ValidationsModal.Update;
    // Act
    component.data.validation = ValidationsModal.Update;
    component.data.atendedor = {
      rut: '92.374.111-9',
      nombre: '',
      apellido: '',
      ideess: '',
      id: ''
    };
    // Assert
    expect(component.setValueData()).toEqual(component.disableForm())
  });


  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('disableForm', () => {
    // Arrange
    component.update = ValidationsModal.Update;
    // Act
    component.data.atendedor = {
      rut: '92.374.111-9',
      nombre: '',
      apellido: '',
      ideess: '',
      id: ''
    };
    // Assert
    expect(component.disableForm()).toEqual(component.attendantForm.controls['rut'].disable())
  });

  /**
  * @returs {*}
  * @membersof AttendantsSaveComponent
  * @author Daniel Rodriguez Cendales
  */
  it('disableForm', () => {
    // Arrange
    component.update = ValidationsModal.Update;
    // Act
    component.data.atendedor = {
      rut: '92.374.111-9',
      nombre: '',
      apellido: '',
      ideess: '',
      id: ''
    };
    // Assert
    expect(component.disableForm()).toEqual(component.attendantForm.controls['id'].disable())
  });




  /**
     * @returs {*}
     * @membersof AttendantsSaveComponent
     * @author Daniel Rodriguez Cendales
     */
  it(' updateAttendant', (() => {
    // Arrange
    const response: any = {};
    component.data.atendedor = {
      rut: '92.374.111-9',
      nombre: '',
      apellido: '',
      ideess: '',
      id: ''
    };
    spyOn(attendantsService, 'updateAttendantsCount').and.returnValue(of(response));
    // Act
    component.updateAttendant();
    fixture.detectChanges();
    // Assert
    expect(component.updateAttendant()).toEqual();
  }));


  /**
     * @returs {*}
     * @membersof AttendantsSaveComponent
     * @author Daniel Rodriguez Cendales
     */
  it(' saveAttendant', (() => {
    // Arrange
    const response: any = {};
    component.data.atendedor = {
      rut: '92.374.111-9',
      nombre: '',
      apellido: '',
      ideess: '',
      id: ''
    };
    spyOn(attendantsService, 'saveAttendantsCount').and.returnValue(of(response));
    // Act
    component.saveAttendant();
    fixture.detectChanges();
    // Assert
    expect(component.saveAttendant()).toEqual();
  }));
});
