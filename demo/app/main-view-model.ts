import {Observable} from 'data/observable';
import * as frameModule from "ui/frame";
import * as tnsOAuthModule from 'nativescript-oauth';

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();
  }

  public onMicrosoftTap() {
    tnsOAuthModule.login()
      .then(()=>{
        console.log('logged in');
        console.dir("accessToken " + tnsOAuthModule.accessToken());
        //frameModule.topmost().navigate('explorer');
      })
      .catch((er)=>{
          console.error('error');
          console.dir(er);
      });
  }

  public onTapGetData() {
    tnsOAuthModule.ensureValidToken()
      .then((token: string)=>{
          console.log('token: ' + token);
      })
      .catch((er)=>{
        console.error('error');
        console.dir(er);
      });
  }
}