
declare module TnsOAuth {
    interface ITnsAuthHelper {
        credentials: ITnsOAuthCredentials;
        tokenResult: ITnsOAuthTokenResult;
        login: (successPage?: string) => Promise<string>;
        logout: (successPage: string) => Promise<{}>;
        refreshToken: () => Promise<string>;
        accessTokenExpired: () => boolean;
        refreshTokenExpired: () => boolean;
    }

    interface ITnsOAuthCredentials {
        authority: string;
        tokenEndpointBase?: string;
        authorizeEndpoint: string;
        tokenEndpoint: string;
        clientId: string;
        clientSecret?: string;
        redirectUri: string;
        scope: string;
    }

    interface ITnsOAuthTokenResult {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiration: Date;
        refreshTokenExpiration: Date;
    }

    interface ITnsOAuthOptions {
        clientId: string;
        scope: string[];
    }

    interface ITnsOAuthOptionsOffice365 extends ITnsOAuthOptions {
    }

    interface ITnsOAuthOptionsFacebook extends ITnsOAuthOptions {
        clientSecret: string;
    }

    interface ITnsOAuthOptionsGoogle extends ITnsOAuthOptions {
    }
}