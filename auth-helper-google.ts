import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';

export class AuthHelperGoogle extends AuthHelper implements TnsAuthHelper {
  
  constructor(clientId: string, scope: Array<string>) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {
      authority: 'https://accounts.google.com/o',
      authorizeEndpoint: '/oauth2/v2/auth',
      tokenEndpoint: '/oauth2/v2.0/token',
      clientId: clientId,
      redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
      scope: scopeStr
    };
  }

  public logout(successPage: string) {
    let cookieDomains = [".google.com"]; //need to double check this
    return this._logout(successPage, cookieDomains);
  }
}
