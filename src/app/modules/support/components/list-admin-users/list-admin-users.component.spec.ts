import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory } from 'src/app/app.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListAdminUsersComponent } from './list-admin-users.component';

describe('ListAdminUsersComponent', () => {
  let component: ListAdminUsersComponent;
  let fixture: ComponentFixture<ListAdminUsersComponent>;

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ListAdminUsersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
