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

describe('AuthMsalService', () => {
    let service: AuthMsalService;

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
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(AuthMsalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });



    /**
    * @returs {*}
    * @membersof AuthMsalService
    * @author Daniel Rodriguez Cendales
    */
    it('AuthMsalService ', () => {
        // Arrange
        // Act
        service.authService.instance.getAllAccounts().length = 0;
        // Assert
        expect(service.setLoginDisplay()).toEqual(false);
    });


    /**
     * @returs {*}
     * @membersof AuthMsalService
     * @author Daniel Rodriguez Cendales
     */
    it('logout ', () => {
        // Arrange
        service.authService.logout();
        // Act
        localStorage.clear();
        sessionStorage.clear();
        // Assert
        expect(service.logout()).toEqual();
    });


     /**
     * @returs {*}
     * @membersof AuthMsalService
     * @author Daniel Rodriguez Cendales
     */
     it('retunData ', () => {
        // Arrange
        service.authService.instance.getActiveAccount()?.idTokenClaims;
        // Act
        // Assert
        expect(service.retunData()).toBeUndefined();
    });
});
