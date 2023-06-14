import { Inject, Injectable } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { b2cPolicies } from './auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthMsalService {
  loginDisplay = false;
  constructor(
    @Inject(MSAL_GUARD_CONFIG) readonly msalGuardConfig: MsalGuardConfiguration,
    readonly authService: MsalService,
  ) { }


  setLoginDisplay(): boolean {
    return this.authService.instance.getAllAccounts().length > 0;
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout(): void {
    this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
  }

  retunData(): any {
    return this.authService.instance.getActiveAccount()?.idTokenClaims;
  }

}
