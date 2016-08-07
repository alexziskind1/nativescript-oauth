import * as applicationModule from 'application';
import * as utils from 'utils/utils';
import { AuthHelperOffice365 } from './auth-helper-office365';
import { AuthHelperFacebook } from './auth-helper-facebook';
import { AuthHelperGoogle } from './auth-helper-google';

export var instance : TnsAuthHelper = null;

export function initOffice365(options: TnsOAuthOptionsOffice365) : Promise<any> {
    return new Promise(function (resolve, reject) {
        try {
            if (instance !== null) {
                reject("You already ran init");
                return;
            }

            instance = new AuthHelperOffice365(options.clientId, options.scope);
            resolve(instance);
        } catch (ex) {
            console.log("Error in AuthHelperOffice365.init: " + ex);
            reject(ex);
        }
    });
}

export function initFacebook(options: TnsOAuthOptionsFacebook) : Promise<any> {
    return new Promise(function (resolve, reject) {
        try {
            if (instance !== null) {
                reject("You already ran init");
                return;
            }

            instance = new AuthHelperFacebook(options.clientId, options.clientSecret, options.scope);
            resolve(instance);
        } catch (ex) {
            console.log("Error in AuthHelperFacebook.init: " + ex);
            reject(ex);
        }
    });
}

export function initGoogle(options: TnsOAuthOptionsGoogle) : Promise<any> {
    return new Promise(function (resolve, reject) {
        try {
            if (instance !== null) {
                reject("You already ran init");
                return;
            }

            instance = new AuthHelperGoogle(options.clientId, options.scope);
            resolve(instance);
        } catch (ex) {
            console.log("Error in AuthHelperFacebook.init: " + ex);
            reject(ex);
        }
    });
}

export function accessToken() : string {
    return instance.tokenResult.accessToken;
}

export function login(successPage?: string) : Promise<any> {
    return instance.login(successPage);
}
export function logout(successPage: string) : Promise<any> {
    return instance.logout(successPage);
}
export function accessTokenExpired() : boolean {
    return instance.accessTokenExpired();
}


