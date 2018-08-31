/// <reference path="references.d.ts" />

import * as tnsOauth from './tns-oauth';
import * as TnsOAuth from './tns-oauth-interfaces';

export class AuthHelper {
    public credentials: TnsOAuth.ITnsOAuthCredentials;
    public tokenResult: TnsOAuth.ITnsOAuthTokenResult;

    constructor() {
        this.tokenResult = tnsOauth.getTokenFromCache();
    }

    public login(navOptions?: TnsOAuth.INavigationOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            tnsOauth.loginViaAuthorizationCodeFlow(this.credentials, navOptions)
                .then((response: TnsOAuth.ITnsOAuthTokenResult) => {
                    this.tokenResult = response;
                    resolve(response.accessToken);
                })
                .catch((er) => {
                    reject(er);
                });
        });
    }

    public refreshToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            tnsOauth.refreshToken(this.credentials)
                .then((response: TnsOAuth.ITnsOAuthTokenResult) => {
                    this.tokenResult = response;
                    resolve(response.accessToken);
                })
                .catch((er) => {
                    reject(er);
                });
        });
    }

    public _logout(navOptions?: TnsOAuth.INavigationOptions, cookieDomains?: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                tnsOauth.logout(cookieDomains, navOptions);
                this.tokenResult = null;
                resolve();
            } catch (er) {
                reject(er);
            }
        });
    }

    public accessTokenExpired(): boolean {
        if (this.tokenResult && this.tokenResult.accessTokenExpiration) {
            return this.tokenResult.accessTokenExpiration < (new Date());
        } else {
            return true;
        }
    }

    public refreshTokenExpired(): boolean {
        if (this.tokenResult && this.tokenResult.refreshTokenExpiration) {
            if (this.tokenResult.refreshTokenExpiration) {
                return this.tokenResult.refreshTokenExpiration < (new Date());
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}