import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {

    constructor(){
      const serviceAccount = require("../../idatdm2-ebcf8-firebase-adminsdk-fbsvc-99d8dcf381.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://idatdm2-ebcf8-default-rtdb.firebaseio.com'
      });
    }

}

