import {Observable} from 'data/observable';
import * as frameModule from "ui/frame";
import * as tnsOAuthModule from 'nativescript-oauth';

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();
  }

  public onTap() {
    tnsOAuthModule.login()
      .then(()=>{
        console.log('logged in');
        console.dir("accessToken " + tnsOAuthModule.accessToken());
        //frameModule.topmost().navigate('explorer');
      })
      .catch((er)=>{
        console.log(er);
      });
  }
}