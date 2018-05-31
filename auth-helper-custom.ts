/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import { AuthHelper } from './auth-helper';
import * as TnsOAuth from './tns-oauth-interfaces';

export class AuthHelperCustom extends AuthHelper implements TnsOAuth.ITnsAuthHelper {

    constructor(
        credentials: TnsOAuth.ITnsOAuthCredentials,
        private cookieDomains: Array<string>,
    ) {
        super();
        this.credentials = {
            ...credentials,
            scope: credentials.scope.replace(/ /g, '%20'),
        };
    }

    public logout(successPage?: string): Promise<void> {
        return this._logout(successPage, this.cookieDomains);
    }
}
