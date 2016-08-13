/// <reference path="demo/node_modules/tns-core-modules/es6-promise.d.ts" />
/// <reference path="./tns-oauth-interfaces.d.ts" />

declare module "nativescript-oauth" {
    export function initOffice365(options: TnsOAuth.ITnsOAuthOptionsOffice365): Promise<any>;
    export function initFacebook(options: TnsOAuth.ITnsOAuthOptionsFacebook): Promise<any>;
    export function initGoogle(options: TnsOAuth.ITnsOAuthOptionsGoogle): Promise<any>;

    export function accessToken() : string;
    export function login(successPage?: string) : Promise<string>;
    export function logout(successPage: string) : Promise<any>;
    export function accessTokenExpired() : boolean;
    export function ensureValidToken() : Promise<string>;
}

