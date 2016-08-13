import * as querystring from 'querystring';
import * as URL from 'url';
import * as http from 'http';
import * as trace from "trace";
import * as frameModule from 'ui/frame';
import * as uuid from './tns-oauth-uuid';
import * as utils from './tns-oauth-utils';
import { TnsOAuthPageProvider } from './tns-oauth-page-provider';
import { TnsOAuthTokenCache } from './tns-oauth-token-cache';

export var ACCESS_TOKEN_CACHE_KEY = 'ACCESS_TOKEN_CACHE_KEY';
export var REFRESH_TOKEN_CACHE_KEY = 'REFRESH_TOKEN_CACHE_KEY';

/**
 * Gets a token for a given resource.
 */
function getTokenFromCode(credentials: TnsOAuth.ITnsOAuthCredentials, code: string) : Promise<TnsOAuth.ITnsOAuthTokenResult> {
  let oauth2 = new TnsOAuth(
    credentials.clientId,
    credentials.clientSecret,
    credentials.authority,
    credentials.tokenEndpointBase,
    credentials.authorizeEndpoint,
    credentials.tokenEndpoint
  );

  let oauthParams = {
      grant_type: 'authorization_code',
      redirect_uri: credentials.redirectUri,
      response_mode: 'form_post',
      nonce: uuid.doit(),
      state: 'abcd'
  };

  return oauth2.getOAuthAccessToken(code, oauthParams);
}

/**
 * Gets a new access token via a previously issued refresh token.
 */
export function getTokenFromRefreshToken(credentials: TnsOAuth.ITnsOAuthCredentials, refreshToken: string) : Promise<TnsOAuth.ITnsOAuthTokenResult> {
  var oauth2 = new TnsOAuth(
    credentials.clientId,
    credentials.clientSecret,
    credentials.authority,
    credentials.tokenEndpointBase,
    credentials.authorizeEndpoint,
    credentials.tokenEndpoint
  );

  let oauthParams = {
      grant_type: 'refresh_token',
      redirect_uri: credentials.redirectUri,
      response_mode: 'form_post',
      nonce: uuid.doit(),
      state: 'abcd'
  };

  return oauth2.getOAuthAccessToken(refreshToken, oauthParams);
}

/**
 * Generate a fully formed uri to use for authentication based on the supplied resource argument
 * @return {string} a fully formed uri with which authentication can be completed
 */
export function getAuthUrl(credentials: TnsOAuth.ITnsOAuthCredentials) : string {
  return credentials.authority + credentials.authorizeEndpoint +
    '?client_id=' + credentials.clientId +
    '&response_type=code' +
    '&redirect_uri=' + credentials.redirectUri +
    '&scope=' + credentials.scope +
    '&response_mode=query' +
    '&nonce=' + uuid.doit() +
    '&state=abcd';
}

export function loginViaAuthorizationCodeFlow(credentials: TnsOAuth.ITnsOAuthCredentials, successPage?: string) : Promise<TnsOAuth.ITnsOAuthTokenResult> {
    return new Promise((resolve, reject) => {
        var navCount = 0;
      
        let checkCodeIntercept = (webView, error) => {
            var retStr = '';

            if (error && error.userInfo && error.userInfo.allValues && error.userInfo.allValues.count > 0) {
                let val0 = error.userInfo.allValues[0];
                if (val0.absoluteString) {
                    retStr = error.userInfo.allValues[0].absoluteString;
                } else {
                    retStr = val0;
                } 
            } else if (webView.request && webView.request.URL && webView.request.URL.absoluteString) {
                retStr = webView.request.URL.absoluteString;
            }

            if (retStr != '') {
                let parsedRetStr = URL.parse(retStr);
                if (parsedRetStr.query) {
                    let qsObj = querystring.parse(parsedRetStr.query);
                    let codeStr = qsObj['code'] ? qsObj['code'] : qsObj['xsrfsign'];
                    if (codeStr) {
                        try {
                            getTokenFromCode(credentials, codeStr)
                            .then((response: TnsOAuth.ITnsOAuthTokenResult)=>{
                                TnsOAuthTokenCache.setToken(response);
                                if (successPage && navCount === 0) {
                                    let navEntry: frameModule.NavigationEntry = {
                                        moduleName: successPage,
                                      clearHistory: true
                                    };
                                    frameModule.topmost().navigate(navEntry);
                                } else {
                                    frameModule.topmost().goBack();
                                }
                                navCount++;
                                resolve(response);
                            })
                            .catch((er)=>{
                                reject(er);
                            });

                        } catch(er) {
                            console.error('getOAuthAccessToken error occurred...');
                            console.dir(er);
                            reject(er);
                        }
                    }
                }
            }
        };

        let authPage = new TnsOAuthPageProvider(checkCodeIntercept, getAuthUrl(credentials));
        frameModule.topmost().navigate(()=>{return authPage.loginPageFunc()});
    });
}

export function refreshToken(credentials: TnsOAuth.ITnsOAuthCredentials) : Promise<TnsOAuth.ITnsOAuthTokenResult>  {
    return new Promise((resolve, reject) => {
        try {
            let oldTokenResult = TnsOAuthTokenCache.getToken();
                
            getTokenFromRefreshToken(credentials, oldTokenResult.refreshToken)
                .then((response: TnsOAuth.ITnsOAuthTokenResult)=>{
                    TnsOAuthTokenCache.setToken(response);
                    resolve(response);
                })
                .catch((er)=>{
                    reject(er);
                });
        } catch(er) {
            console.error('refreshToken error occurred...');
            console.dir(er);
            reject(er);
        }
    });
}

export function logout(cookieDomains: string[], successPage: string) {
    let cookieArr = utils.nsArrayToJSArray(NSHTTPCookieStorage.sharedHTTPCookieStorage().cookies);
    for (var i = 0; i < cookieArr.length; i++) {
        var cookie: NSHTTPCookie = <NSHTTPCookie>cookieArr[i];
        for (var j = 0; j < cookieDomains.length; j++) {
            if(utils.endsWith(cookie.domain, cookieDomains[j])) {
                NSHTTPCookieStorage.sharedHTTPCookieStorage().deleteCookie(cookie);
            }
        }
    }
    let navEntry: frameModule.NavigationEntry = {
                    moduleName: successPage,
                    clearHistory: true
                };
    frameModule.topmost().navigate(navEntry);
}

class TnsOAuth {
    private _clientId: string;
    private _clientSecret: string;
    private _baseSite: string;
    private _baseSiteToken: string;
    private _authorizeUrl: string;
    private _accessTokenUrl: string;
    private _accessTokenName: string;
    private _authMethod: string;
    private _customHeaders: any;
    private _useAuthorizationHeaderForGET: boolean;

    constructor(clientId: string,
                clientSecret: string,
                baseSite: string,
                baseSiteToken: string,
                authorizePath: string, 
                accessTokenPath: string, 
                customHeaders?: any) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._baseSite = baseSite;
        this._baseSiteToken = baseSiteToken;
        this._authorizeUrl = authorizePath || "/oauth/authorize";
        this._accessTokenUrl = accessTokenPath || "/oauth/access_token";
        this._accessTokenName = "access_token";
        this._authMethod = "Bearer";
        this._customHeaders = customHeaders || {};
        this._useAuthorizationHeaderForGET = false;
    }

    get accessTokenUrl(): string {
        if (this._baseSiteToken && this._baseSiteToken != '') {
            return this._baseSiteToken + this._accessTokenUrl;
        } else {
            return this._baseSite + this._accessTokenUrl; /* + "?" + querystring.stringify(params); */
        }
    }

    // This 'hack' method is required for sites that don't use
    // 'access_token' as the name of the access token (for requests).
    // ( http://tools.ietf.org/html/draft-ietf-oauth-v2-16#section-7 )
    // it isn't clear what the correct value should be atm, so allowing
    // for specific (temporary?) override for now.
    public setAccessTokenName(name) {
        this._accessTokenName = name;
    }

    // Sets the authorization method for Authorization header.
    // e.g. Authorization: Bearer <token>  # "Bearer" is the authorization method.
    public setAuthMethod(authMethod) {
        this._authMethod = authMethod;
    };

    // If you use the OAuth2 exposed 'get' method (and don't construct your own _request call )
    // this will specify whether to use an 'Authorize' header instead of passing the access_token as a query parameter
    public useAuthorizationHeaderforGET(useIt) {
        this._useAuthorizationHeaderForGET = useIt;
    }

    // Build the authorization header. In particular, build the part after the colon.
    // e.g. Authorization: Bearer <token>  # Build "Bearer <token>"
    public buildAuthHeader(token) {
        return this._authMethod + ' ' + token;
    };

    public getAuthorizeUrl(params) {
        var params= params || {};
        params['client_id'] = this._clientId;
        return this._baseSite + this._authorizeUrl + "?" + querystring.stringify(params);
    }

    public getOAuthAccessToken(code, params) : Promise<TnsOAuth.ITnsOAuthTokenResult> {
        //console.log('called TnsOAuth.getOAuthAccessToken');
        var params= params || {};
        params['client_id'] = this._clientId;
        if (this._clientSecret && this._clientSecret != '') {
            params['client_secret'] = this._clientSecret;
        }

        var codeParam = (params.grant_type === 'refresh_token') ? 'refresh_token' : 'code';
        params[codeParam]= code;

        var post_data= querystring.stringify( params );
        var post_headers= {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        return new Promise<TnsOAuth.ITnsOAuthTokenResult>((resolve, reject)=>{
            this._request("POST", this.accessTokenUrl, post_headers, post_data, null)
            .then((response:http.HttpResponse)=>{
                var results;
                try {
                    // As of http://tools.ietf.org/html/draft-ietf-oauth-v2-07
                    // responses should be in JSON
                    results = response.content.toJSON();
                }
                catch(e) {
                    // .... However both Facebook + Github currently use rev05 of the spec
                    // and neither seem to specify a content-type correctly in their response headers :(
                    // clients of these services will suffer a *minor* performance cost of the exception
                    // being thrown
                    results = querystring.parse(response.content.toString());
                }
                let access_token = results["access_token"];
                let refresh_token = results["refresh_token"];
                let expires_in = results["expires_in"];
                delete results["refresh_token"];

                let expSecs = Math.floor(parseFloat(expires_in));
                let expDate = new Date();
                expDate.setSeconds(expDate.getSeconds() + expSecs);

                let tokenResult: TnsOAuth.ITnsOAuthTokenResult = {
                    accessToken: access_token, 
                    refreshToken: refresh_token,
                    accessTokenExpiration: expDate,
                    refreshTokenExpiration: expDate
                };

                resolve(tokenResult);
            })
            .catch((er)=>{
                reject(er);
            });
        });
    }

    private _request(method, url, headers, post_body, access_token) : Promise<http.HttpResponse> {
        var parsedUrl = URL.parse(url, true);

        var realHeaders= {};
        for (var key in this._customHeaders) {
            realHeaders[key] = this._customHeaders[key];
        }
        if (headers) {
            for(var key in headers) {
                realHeaders[key] = headers[key];
            }
        }
        realHeaders['Host'] = parsedUrl.host;

        if (access_token && !('Authorization' in realHeaders)) {
            if (!parsedUrl.query) {
                parsedUrl.query = {};
            }
            parsedUrl.query[this._accessTokenName] = access_token;
        }

        var queryStr = querystring.stringify(parsedUrl.query);
        if (queryStr) {
            queryStr =  "?" + queryStr;
        }
        var options = {
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + queryStr,
            method: method,
            headers: realHeaders
        };

        return this._executeRequest(options, url, post_body);
    }

    private _executeRequest(options, url, post_body) : Promise<http.HttpResponse> {
        var promise = http.request({
            url: url,
            method: options.method,
            headers: options.headers,
            content: post_body
        });
        return promise;
    }
}