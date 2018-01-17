/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

/**
 Contains DropBox connection credentials
*/
export class AuthHelperDropBox extends AuthHelper implements TnsOAuth.ITnsAuthHelper {
  //Constructs the the object with specified id, secret and scope
  constructor(clientId: string, clientSecret: string, redirectUri: string, scope: Array<string>) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {
      authority: 'https://www.dropbox.com',
      tokenEndpointBase: 'https://api.dropboxapi.com',
      authorizeEndpoint: '/oauth2/authorize',
      tokenEndpoint: '/oauth2/token',
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri,
      scope: scopeStr,
      ignoredAuthParams: ['response_mode','nonce'],
      ignoredTokenParams: ['response_mode','nonce','state'],
      skipNextTokenNav: true
    };
  }
  //Gets cookie domains for logging out
  public logout(successPage?: string): Promise<void> {
    let cookieDomains = [".dropbox.com"]; 
    return this._logout(successPage, cookieDomains);
  }
}
