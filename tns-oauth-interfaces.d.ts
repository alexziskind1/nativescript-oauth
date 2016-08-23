


export interface ITnsAuthHelper {
    credentials: ITnsOAuthCredentials;
    tokenResult: ITnsOAuthTokenResult;
    login: (successPage?: string) => Promise<string>;
    logout: (successPage: string) => Promise<{}>;
    refreshToken: () => Promise<string>;
    accessTokenExpired: () => boolean;
    refreshTokenExpired: () => boolean;
}

export interface ITnsOAuthCredentials {
    authority: string;
    tokenEndpointBase?: string;
    authorizeEndpoint: string;
    tokenEndpoint: string;
    clientId: string;
    clientSecret?: string;
    redirectUri: string;
    scope: string;
}

export interface ITnsOAuthTokenResult {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: Date;
    refreshTokenExpiration: Date;
}

export interface ITnsOAuthOptions {
    clientId: string;
    scope: string[];
}

export interface ITnsOAuthOptionsOffice365 extends ITnsOAuthOptions {
}

export interface ITnsOAuthOptionsFacebook extends ITnsOAuthOptions {
    clientSecret: string;
}

export interface ITnsOAuthOptionsGoogle extends ITnsOAuthOptions {
}