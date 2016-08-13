import * as applicationSettingsModule from "application-settings";

const TNS_OAUTH_KEY = "TNS_OAUTH_KEY";

export class TnsOAuthTokenCache {

    public static hasToken() : boolean {
        return applicationSettingsModule.hasKey(TNS_OAUTH_KEY);
    }

    public static getToken() : TnsOAuth.ITnsOAuthTokenResult {
        if (applicationSettingsModule.hasKey(TNS_OAUTH_KEY)) {
            let t = applicationSettingsModule.getString(TNS_OAUTH_KEY);
            return <TnsOAuth.ITnsOAuthTokenResult>JSON.parse(t);
        }
        else return null;
    }

    public static setToken(token: TnsOAuth.ITnsOAuthTokenResult) {
        applicationSettingsModule.setString(TNS_OAUTH_KEY, JSON.stringify(token));
    }

    public static removeToken() {
        applicationSettingsModule.remove(TNS_OAUTH_KEY);
    }

}