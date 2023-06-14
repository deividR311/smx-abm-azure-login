import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MSAL_GUARD_CONFIG, MsalGuardConfiguration} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { msalConfig } from './core/authentication/auth-config';

describe('Sanitize the configuration object', () => {

  
});

describe('Ensure that the app starts', () => {
    
});

function setup() {

    function MSALGuardConfigFactory(): MsalGuardConfiguration {
        return {
            interactionType: InteractionType.Redirect,
        };
    }

    TestBed.configureTestingModule({
        imports: [
            AppModule,
            RouterTestingModule,
        ],
        providers: [
            {
                provide: MSAL_GUARD_CONFIG,
                useFactory: MSALGuardConfigFactory
            }
        ]
    }).compileComponents();

    let rootFixture: ComponentFixture<AppComponent>;
    const initializeRootFixture = () => {
        if (rootFixture == null) {
            rootFixture = TestBed.createComponent(AppComponent);
        }
    };

    return {
        get router() {
            initializeRootFixture();

            return TestBed.inject(Router);
        },
        run<TResult>(task: () => TResult) {
            initializeRootFixture();

            return rootFixture.ngZone == null
                ? task()
                : rootFixture.ngZone.run(task);
        },
        fixture: TestBed.createComponent(AppComponent)
    };
}