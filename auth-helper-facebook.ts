/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

export class AuthHelperFacebook extends AuthHelper implements TnsOAuth.ITnsAuthHelper {

  constructor(clientId: string, clientSecret: string, scope: Array<string>) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {
      authority: 'https://www.facebook.com/dialog',
      tokenEndpointBase: 'https://graph.facebook.com',
      authorizeEndpoint: '/oauth',
      tokenEndpoint: '/v2.3/oauth/access_token',
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: 'https://www.facebook.com/connect/login_success.html',
      scope: scopeStr
    };
  }

  public logout(successPage?: string): Promise<void> {
    let cookieDomains = [".facebook.com"]; //need to double check this
    return this._logout(successPage, cookieDomains);
  }
}
