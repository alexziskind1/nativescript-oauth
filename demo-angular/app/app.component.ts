import { Component } from "@angular/core";
import * as tnsOAuthModule from 'nativescript-oauth';
import * as dialogs from 'ui/dialogs';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
        
    public onTapLogin() {
        tnsOAuthModule.ensureValidToken()
            .then((token: string) => {
                dialogs.alert('Got a token:' + token).then(()=> {
                    console.log('Dialog closed!');
                });

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

    public onTapCallApi() {

        
    }

    public authcallback() {
        console.log('yay callback');
    }
}
