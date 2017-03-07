/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

export class AuthHelperUaa extends AuthHelper implements TnsOAuth.ITnsAuthHelper {

  constructor(clientId: string, clientSecret: string, scope: Array<string>) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {

      // make configurable...
      authority:  'https://5abc6901-aa46-41af-8870-7aaf4290d610.predix-uaa.run.aws-usw02-pr.ice.predix.io',
      authorizeEndpoint: '/oauth/authorize',
      tokenEndpoint: '/oauth/token',
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: 'nsoauthtest://onoauthcallback',
      scope: scopeStr
    };
  }

  public logout(successPage?: string): Promise<void> {
    let cookieDomains = ["nsoauthtest://"];
    return this._logout(successPage, cookieDomains);
  }
}

