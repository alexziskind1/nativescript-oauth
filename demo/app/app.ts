import * as application from 'application';
import * as tnsOAuthModule from 'nativescript-oauth';

var o365InitOptions : TnsOAuth.ITnsOAuthOptionsOffice365 = {
    clientId: 'efe9a9ce-2dce-4b25-b122-bfef6aa4a9ff', //client id for application (GUID)
    scope: ['Files.ReadWrite', 'User.ReadWrite', 'offline_access']
};

var facebookInitOptions : TnsOAuth.ITnsOAuthOptionsFacebook = {
    clientId: '1819818654921817',
    clientSecret: 'b7e58f212b51e4d639bed857171c992a',
    scope: ['email']
};

tnsOAuthModule.initOffice365(o365InitOptions);
//tnsOAuthModule.initFacebook(facebookInitOptions);

application.start({ moduleName: 'main-page' });
