import { Observable } from 'data/observable';
import * as frameModule from "ui/frame";
import * as tnsOAuthModule from 'nativescript-oauth';

export class HelloWorldModel extends Observable {
    public message: string;

    constructor() {
        super();
    }

    public onTapLogin() {
        tnsOAuthModule.ensureValidToken()
            .then((token: string) => {
                console.log('token: ' + token);
            })
            .catch((er) => {
                console.error('error logging in');
                console.dir(er);
            });
    }

    public onTapLogout() {
        tnsOAuthModule.logout()
            .then(() => console.log('logged out'))
            .catch((er) => {
                console.error('error logging out');
                console.dir(er);
            });
    }

}