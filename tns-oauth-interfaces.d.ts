
interface TnsAuthHelper {
    credentials: TnsOAuthCredentials;
    tokenResult: TnsOAuthTokenResult;
    login: (successPage?: string) => Promise<{}>;
    logout: (successPage: string) => Promise<{}>;
    accessTokenExpired: () => boolean;
}

interface TnsOAuthCredentials {
    authority: string;
    tokenEndpointBase?: string;
    authorizeEndpoint: string;
    tokenEndpoint: string;
    clientId: string;
    clientSecret?: string;
    redirectUri: string;
    scope: string;
}

interface TnsOAuthTokenResult {
     accessToken: string;
     refreshToken: string;
}

interface TnsOAuthOptions {
    clientId: string;
    scope: string[];
}

interface TnsOAuthOptionsOffice365 extends TnsOAuthOptions {
}

interface TnsOAuthOptionsFacebook extends TnsOAuthOptions {
    clientSecret: string;
}

interface TnsOAuthOptionsGoogle extends TnsOAuthOptions {
}