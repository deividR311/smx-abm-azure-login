import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SeasonsComponent } from './seasons.component';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory } from 'src/app/app.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeasonsService } from '../../services/seasons.service';
import { of } from 'rxjs';
import { AttendantsService } from '../../services/attendants.service';

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;
  let authMsalService: AuthMsalService;
  let seasonsService: SeasonsService;
  let attendantsService: AttendantsService;

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
      declarations: [SeasonsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        AuthMsalService,

        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true,

        },
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useFactory: MSALGuardConfigFactory
        },
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useFactory: MSAL_INTERCEPTOR_CONFIG,
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsComponent);
    component = fixture.componentInstance;
    authMsalService = TestBed.inject(AuthMsalService);
    seasonsService = TestBed.inject(SeasonsService);
    attendantsService = TestBed.inject(AttendantsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /**
     * @returs {*}
     * @membersof AttendantsSaveComponent
     * @author Daniel Rodriguez Cendales
     */
  it(' getSeasons', (() => {
    // Arrange
    const response: any = {
      data: []
    }
    component.infouser = 'asdasdas'
    spyOn(seasonsService, 'getSeasons').and.returnValue(of(response));
    // Act
    component.getSeasons();
    fixture.detectChanges();
    // Assert
    expect(component.getSeasons()).toEqual(component.getAttendantsCount(response.data));
  }));


  /**
   * @returs {*}
   * @membersof AttendantsSaveComponent
   * @author Daniel Rodriguez Cendales
   */
  it(' captureIdStation captureIdStation', (() => {
    // Arrange
    const data: any = [
      {
        rut: '92.374.111-9',
        nombre: '',
        apellido: '',
        ideess: '32423423',
        id: ''
      }
    ];
    // Act
    component.captureIdStation('dfsdfsd', data[0]);
    // Assert
    expect(component.captureIdStation('dfsdfsd', data[0])).toEqual();
  }));


  /**
    * @returs {*}
    * @membersof AttendantsSaveComponent
    * @author Daniel Rodriguez Cendales
    */
  it(' getAttendantsCount1', (() => {
    // Arrange
    const data: any =
    {
      rut: '92.374.111-9',
      nombre: '',
      apellido: '',
      ee_ss: {
        ideess: '32423423',
        nombrefantasia: 'asdsad'
      },
      id: ''
    }

    const response: any = {
      data: []
    }
    spyOn(attendantsService, 'getAttendantsCount').and.returnValue(of(response));
    // Act
    component.getAttendantsCount1(data);
    fixture.detectChanges();
    // Assert
    expect(component.getAttendantsCount1(data)).toEqual();
  }));

});
