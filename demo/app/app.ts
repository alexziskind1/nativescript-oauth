import * as application from 'application';
import * as tnsOAuthModule from 'nativescript-oauth';

var o365InitOptions : TnsOAuthOptionsOffice365 = {
    clientId: 'e392f6aa-da5c-434d-a42d-a0e0a27d3964', //client id for application (GUID)
    scope: ['Files.ReadWrite', 'offline_access']
};

var facebookInitOptions : TnsOAuthOptionsFacebook = {
    clientId: '1819818654921817',
    clientSecret: 'b7e58f212b51e4d639bed857171c992a',
    scope: ['email']
};

tnsOAuthModule.initOffice365(o365InitOptions);
//tnsOAuthModule.initFacebook(facebookInitOptions);

application.start({ moduleName: 'main-page' });
