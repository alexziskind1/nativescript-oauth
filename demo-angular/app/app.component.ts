import { Component } from "@angular/core";
import * as tnsOAuthModule from 'nativescript-oauth';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public counter: number = 16;

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }

    public onTap() {
        tnsOAuthModule.ensureValidToken()
            .then((token: string) => {
                console.log('token: ' + token);
            })
            .catch((er) => {
                console.error('error');
                console.dir(er);
            });
    }
}
