/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

/**
 Contains Salesforce connection credentials
*/
export class AuthHelperSalesforce extends AuthHelper implements TnsOAuth.ITnsAuthHelper {
  //Constructs the the object with specified id, secret and scope
  constructor(
    authority: string,
    clientId: string,
    //clientSecret: string,
    redirectUri: string,
    responseType: string,
    scope: Array<string>
  ) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {
      authority: authority,
      authorizeEndpoint: '/services/oauth2/authorize',
      tokenEndpoint: '/services/oauth2/token',
      clientId: clientId,
      //clientSecret: clientSecret,
      redirectUri: redirectUri,
      responseType: responseType,
      scope: scopeStr
    };
  }
  //Gets cookie domains for logging out
  public logout(successPage?: string): Promise<void> {
    let cookieDomains = [".force.com"]; 
    return this._logout(successPage, cookieDomains);
  }
}
