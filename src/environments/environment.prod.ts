export const environment = {
  production: true,
  apiUrl: '#{apiUrl}#',
  apiUrlAtendedor: '#{apiUrlAtendedor}#',
  b2cConfig: {
    clientId: '#{b2cConfig.clientId}#',
    redirectUri: '#{b2cConfig.redirectUri}#',
    postLogoutRedirectUri: '#{b2cConfig.postLogoutRedirectUri}#',
    signIn: '#{b2cConfig.signIn}#',
    editProfile: '#{b2cConfig.editProfile}#',
    signIn_authority: '#{b2cConfig.signIn_authority}#',
    editProfile_authority: '#{b2cConfig.editProfile_authority}#',
    authorityDomain: '#{b2cConfig.authorityDomain}#',
    signUp: '#{b2cConfig.SignUp}#',
    signUp_authority: '#{b2cConfig.signUp_authority}#',
    forgotPassword: '#{b2cConfig.forgotPassword}#',
    forgotPassword_authority : '#{b2cConfig.forgotPassword_authority}#'
  },
  signUpRedirectURL: '#{signUpRedirectURL}#',
  urlOauth2B2c: '#{urlOauth2B2c}#'

};
