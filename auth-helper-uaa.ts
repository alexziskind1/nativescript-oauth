/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

export class AuthHelperUaa extends AuthHelper implements TnsOAuth.ITnsAuthHelper {

  private _cookieDomains: string[];

  constructor(authority: string, redirectUri: string, clientId: string, clientSecret: string, scope: Array<string>, cookieDomains: Array<string>, basicAuthHeader: string) {
    super();
    var scopeStr = scope.join('%20');

    let uaaCreds:  TnsOAuth.ITnsOAuthCredentialsUaa = {
      authority: authority,
      authorizeEndpoint: '/oauth/authorize',
      tokenEndpoint: '/oauth/token',
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri,
      scope: scopeStr,
      basicAuthHeader: basicAuthHeader
    };

    this.credentials = uaaCreds;
    this._cookieDomains = cookieDomains;
  }

  public logout(successPage?: string): Promise<void> {
    let cookieDomains = this._cookieDomains;
    return this._logout(successPage, cookieDomains);
  }
}

