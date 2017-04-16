/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

/**
 Contains LinkedIn connection credentials
*/
export class AuthHelperLinkedIn extends AuthHelper implements TnsOAuth.ITnsAuthHelper {
  //Constructs the the object with specified id, secret and scope
  constructor(clientId: string, clientSecret: string, redirectUri: string, scope: Array<string>) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {
      authority: 'https://www.linkedin.com',
      tokenEndpointBase: 'https://www.linkedin.com',
      authorizeEndpoint: '/oauth/v2/authorization',
      tokenEndpoint: '/oauth/v2/accessToken',
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri,
      scope: scopeStr
    };
  }
  //Gets cookie domains for logging out
  public logout(successPage?: string): Promise<void> {
    let cookieDomains = [".linkedin.com"]; 
    return this._logout(successPage, cookieDomains);
  }
}
