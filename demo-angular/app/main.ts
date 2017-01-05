// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import * as tnsOAuthModule from 'nativescript-oauth';


var o365InitOptions: tnsOAuthModule.ITnsOAuthOptionsOffice365 = {
    clientId: '99e1c318-a133-482f-a53b-5122ceab4c00', //client id for application (GUID)
    scope: ['Files.ReadWrite', 'User.ReadWrite', 'offline_access']
};

var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '111754360734111',
    clientSecret: '33ee8ba4bb00408e72d6117a0d136955',
    scope: ['email']
};

//tnsOAuthModule.initOffice365(o365InitOptions);
tnsOAuthModule.initFacebook(facebookInitOptions);


platformNativeScriptDynamic().bootstrapModule(AppModule);
