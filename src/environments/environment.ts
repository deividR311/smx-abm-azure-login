// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  apiUrl: 'https://esmax-pwa-dev.azurefd.net/3011/',
  apiUrlAtendedor: 'https://esmax-pwa-dev.azurefd.net/3010/',
  b2cConfig: {
    clientId: 'adbc93a1-3f4c-482e-adca-5724ab089371',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: '/',
    signIn: 'B2C_1A_SIGNUP_SIGNIN',
    editProfile: 'b2c_1_edit_profile_v2',
    signIn_authority: 'https://pwadev.b2clogin.com/pwadev.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN',
    editProfile_authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_edit_profile_v2',
    authorityDomain: 'pwadev.b2clogin.com',
    signUp: 'B2C_1_esmax_sign_up',
    signUp_authority: 'https://pwadev.b2clogin.com/pwadev.onmicrosoft.com/B2C_1_esmax_sign_up',
    forgotPassword: 'B2C_1_ForgotPassword',
    forgotPassword_authority: 'https://pwadev.b2clogin.com/pwadev.onmicrosoft.com/B2C_1_ForgotPassword'
  },
  signUpRedirectURL: 'http%3A%2F%2Flocalhost:4200',
  urlOauth2B2c: 'https://pwadev.b2clogin.com/pwadev.onmicrosoft.com/oauth2/v2.0'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
