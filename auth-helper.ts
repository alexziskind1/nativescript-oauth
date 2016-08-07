import * as tnsOauth from './tns-oauth';

export class AuthHelper {
    public credentials: TnsOAuthCredentials;
    public tokenResult: TnsOAuthTokenResult;

    public login(successPage?: string) : Promise<{}> {
        return new Promise((resolve, reject)=>{
            tnsOauth.loginViaAuthorizationCodeFlow(this.credentials, successPage)
            .then((response: TnsOAuthTokenResult)=>{
                this.tokenResult = response;
                resolve();
            })
            .catch(()=>{
                reject();
            });
        });
    }

    public _logout(successPage: string, cookieDomains?: string[]) {
        return new Promise((resolve, reject)=>{
            try {
                tnsOauth.logout(cookieDomains, successPage);
                this.tokenResult = null;
                resolve();
            } catch(er) {
                reject(er);
            }
        });
    }

    public accessTokenExpired() : boolean {
        throw new Error("accessTokenExpired not implemented yet");
    }
}