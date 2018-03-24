// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import * as tnsOAuthModule from 'nativescript-oauth';



var o365InitOptions: tnsOAuthModule.ITnsOAuthOptionsOffice365 = {
    clientId: '67e1c318-a133-432f-a53b-5122ce111111', //client id for application (GUID)
    scope: ['Files.ReadWrite', 'User.ReadWrite', 'offline_access']
};
//tnsOAuthModule.initOffice365(o365InitOptions);


var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '691208554415645',
    clientSecret: 'd8725ac416fa1bb1917ccffd1670e3c6',
    scope: ['email']
};
tnsOAuthModule.initFacebook(facebookInitOptions);



// let uaaInitOptions: tnsOAuthModule.ITnsOAuthOptionsUaa = {
//    authority: '',
//    redirectUri: '',
//    clientId: '',
//    clientSecret: '',
//    scope: ['uaa.resource', 'uaa.user'],
//    cookieDomains: [''],
//    basicAuthHeader: ''

//};

//tnsOAuthModule.initUaa(uaaInitOptions);

/*
var linkedInInitOptions: tnsOAuthModule.ITnsOAuthOptionsLinkedIn = {
    clientId: '77jymt11111111',				    // Add your client id
    clientSecret: 'ibVkPD6m11111111',			// Add your client secret
    scope: ['r_basicprofile'],	// Do not include if you want the default scopes
    redirectUri: 'https://localhost' // Configure your redirect URL here it must be and https or it will prevent iOS from working.
};
tnsOAuthModule.initLinkedIn(linkedInInitOptions);
*/

platformNativeScriptDynamic().bootstrapModule(AppModule);
