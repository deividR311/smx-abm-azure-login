import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MSALGuardConfigFactory, MSALInstanceFactory } from 'src/app/app.module';
import { AuthMsalService } from 'src/app/core/authentication/auth-msal.service';
import { MaterialModule } from '../../material/material.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MaterialModule, MsalModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        TranslateService,
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
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
