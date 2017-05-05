/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "./bundle-config";
import * as app from 'application';
import trace = require("trace");
import * as tnsOAuthModule from 'nativescript-oauth';


var azureInitOptions: tnsOAuthModule.ITnsOAuthOptionsAzure = {
    clientId: 'a44ea48e-22ec-473e-a7f7-dc4b001aaa54', //client id for application (GUID)
    scope: ['openid'],
    tenant: 'SOME_TEST_TENANT'
};

var o365InitOptions: tnsOAuthModule.ITnsOAuthOptionsOffice365 = {
    clientId: 'a44ea48e-22ec-473e-a7f7-dc4b001aaa54', //client id for application (GUID)
    scope: ['openid']
};

var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '3158457404242024',
    clientSecret: '544bae9b9e1e6104d9c684c01a967834',
    scope: ['email']
};

tnsOAuthModule.initAzure(azureInitOptions);
//tnsOAuthModule.initOffice365(o365InitOptions);
//tnsOAuthModule.initFacebook(facebookInitOptions);

trace.setCategories(trace.categories.All);
trace.enable();

app.start({ moduleName: 'main-page' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
