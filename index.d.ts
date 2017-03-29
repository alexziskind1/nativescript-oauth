
import * as TnsOAuth from './tns-oauth-interfaces';
export * from './tns-oauth-interfaces';

export declare var instance: TnsOAuth.ITnsAuthHelper;
export declare function initOffice365(options: TnsOAuth.ITnsOAuthOptionsOffice365): Promise<any>;
export declare function initFacebook(options: TnsOAuth.ITnsOAuthOptionsFacebook): Promise<any>;
export declare function initGoogle(options: TnsOAuth.ITnsOAuthOptionsGoogle): Promise<any>;
export declare function initUaa(options: TnsOAuth.ITnsOAuthOptionsUaa): Promise<any>;
export declare function initLinkedIn(options: TnsOAuth.ITnsOAuthOptionsLinkedIn): Promise<any>;

export declare function accessToken(): string;
export declare function login(successPage?: string): Promise<string>;
export declare function logout(successPage?: string): Promise<void>;
export declare function accessTokenExpired(): boolean;
export declare function ensureValidToken(): Promise<string>;

