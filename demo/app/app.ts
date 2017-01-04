import * as application from 'application';
import * as tnsOAuthModule from 'nativescript-oauth';


var o365InitOptions: tnsOAuthModule.ITnsOAuthOptionsOffice365 = {
    clientId: '99e1c318-a133-482f-a53b-5122ceab4c00', //client id for application (GUID)
    scope: ['Files.ReadWrite', 'User.ReadWrite', 'offline_access']
};

var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '996054078783499',
    clientSecret: '99390a088882d611c8d585dfab17cd99',
    scope: ['email']
};

//tnsOAuthModule.initOffice365(o365InitOptions);
tnsOAuthModule.initFacebook(facebookInitOptions);

application.start({ moduleName: 'main-page' });
