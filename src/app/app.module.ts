import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentsModule } from './shared/shared.modules';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { msalConfig } from './core/authentication/auth-config';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from "ngx-loading";
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTPLoaderInterceptor } from './core/http-interceptor/http-interceptor';
import { RutModule } from 'rut-chileno' // <- aqui debes importarlo 


/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    SharedComponentsModule,
    // SweetAlert2Module.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    RutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    MsalModule,
    NgxPermissionsModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    AppRoutingModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPLoaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


/**
 *
 *
 * @export
 * @param {HttpClient} http
 * @return {*} 
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
