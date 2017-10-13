/// <reference path="references.d.ts" />

import * as URL from 'url';
import * as http from 'http';
import * as querystring from 'querystring';
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
      redirectUri: string,
      responseType: string,
      scope: Array<string>,
      webviewSettingsIntercept?: (WebView) => void
  ) {
    super();
    var scopeStr = scope.join('%20');
    this.credentials = {
        authority: authority,
        authorizeEndpoint: '/exedeuseragent',
        tokenEndpoint: '/services/oauth2/token',
        revokeEndpoint: '/services/oauth2/revoke',
        clientId: clientId,
        redirectUri: redirectUri,
        responseType: responseType,
        scope: scopeStr
    };
    this._webviewSettingsIntercept = webviewSettingsIntercept;
  }
  //Gets cookie domains for logging out
  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            // call revoke token here 
            var revoke_url = this.credentials.authority + this.credentials.revokeEndpoint;
            var post_headers = {
                // XXX: Not sure if this header is needed
                //'Host': URL.parse(revoke_url, true),
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            var post_body = querystring.stringify({token: this.tokenResult.refreshToken});

            http.request({
                url: revoke_url,
                method: 'POST',
                headers: post_headers,
                content: post_body
            }).then((response: http.HttpResponse) => {
                if (response.statusCode != 200) {
                    throw new Error(`Failed logout with status ${ response.statusCode }.`);
                }
            });
            this.tokenResult = null;
            resolve();
        } catch (er) {
            reject(er);
        }
    });

  }
}
