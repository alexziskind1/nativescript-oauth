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
        this.credentials = {} as any;
        Object.assign(this.credentials, credentials);
        this.credentials.scope = credentials.scope.replace(/ /g, '%20');
    }

    public logout(navOptions?: TnsOAuth.INavigationOptions): Promise<void> {
        return this._logout(navOptions, this.cookieDomains);
    }
}
