import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';

import { Platform } from 'ionic-angular';

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushProvider {

  constructor(private oneSignal: OneSignal, public platform: Platform) {
    console.log('Hello PushProvider Provider');
  }

  initializeNotifications() {
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('APP_ID_ONESIGNAL', 'SENDER_ID_FIREBASE');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // works when app is opened foreground or background not closed
        // do something when notification is received
        console.log('Notification recivied');
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        console.log('Notification opened');
      });

      this.oneSignal.endInit();
    } else {
      console.log('Disabled in browser');
    }

  }

  getIds(){
    this.oneSignal.getIds()
    .then(val => {
      console.log("Device token " + val.pushToken);
      console.log("User ID " + val.userId);
    })
    .catch(err => {
      console.log(err);
    });
  }

}
