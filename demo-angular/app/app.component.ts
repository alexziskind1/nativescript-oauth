import { Component } from "@angular/core";
import * as tnsOAuthModule from 'nativescript-oauth';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

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
