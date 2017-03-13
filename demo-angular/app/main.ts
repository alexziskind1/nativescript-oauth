// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import * as tnsOAuthModule from 'nativescript-oauth';


// var o365InitOptions: tnsOAuthModule.ITnsOAuthOptionsOffice365 = {
//     clientId: '67e1c318-a133-432f-a53b-5122ceab4c08', //client id for application (GUID)
//     scope: ['Files.ReadWrite', 'User.ReadWrite', 'offline_access']
// };

// var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
//     clientId: '111754360734111',
//     clientSecret: '33ee8ba4bb00408e72d6117a0d136955',
//     scope: ['email']
// };

let uaaInitOptions: tnsOAuthModule.ITnsOAuthOptionsUaa = {
    authority: 'https://5abc6901-aa46-41af-8870-7aaf4290d610.predix-uaa.run.aws-usw02-pr.ice.predix.io',
    redirectUri: 'udentifyclient://authcallback',
    clientId: 'udentify_client',
    clientSecret: 'udentify_client',
    scope: ['uaa.resource', 'uaa.user'],
    cookieDomains: ["udentifyclient://"],
    basicAuthHeader: "Basic dWRlbnRpZnlfY2xpZW50OnVkZW50aWZ5X2NsaWVudA=="
    
}

// tnsOAuthModule.initOffice365(o365InitOptions);
// tnsOAuthModule.initFacebook(facebookInitOptions);


tnsOAuthModule.initUaa(uaaInitOptions);


platformNativeScriptDynamic().bootstrapModule(AppModule);
