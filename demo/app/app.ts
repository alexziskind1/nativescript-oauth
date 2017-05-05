/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "./bundle-config";
import * as app from 'application';
import trace = require("trace");
import * as tnsOAuthModule from 'nativescript-oauth';


var o365InitOptions: tnsOAuthModule.ITnsOAuthOptionsOffice365 = {
    clientId: '31e1c318-a133-432f-a53b-5122ceab4c12', //client id for application (GUID)
    scope: ['Files.ReadWrite', 'User.ReadWrite', 'offline_access']
};

var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '1258457404242046',
    clientSecret: 'a24bae9b9e1e6104d9c684c01a96783d',
    scope: ['email']
};

//tnsOAuthModule.initOffice365(o365InitOptions);
tnsOAuthModule.initFacebook(facebookInitOptions);

trace.setCategories(trace.categories.All);
trace.enable();

app.start({ moduleName: 'main-page' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
