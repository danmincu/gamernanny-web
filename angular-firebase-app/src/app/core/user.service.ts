import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
//import * as admin from 'firebase-admin';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth) {
    if (this.afAuth) {
      this.afAuth.idToken.subscribe(tkn => console.log(tkn));
    }
 }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {          
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  showCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
          // Confirm the user is an Admin.
          console.log(idTokenResult.claims)
          resolve();
        }),
      error => {
        console.log(error);
        reject(error);
      }
    })
  }

  // addClaimCurrentUser() {
  //     return new Promise<any>((resolve, reject) => {
  //       //var user = firebase.auth().currentUser;

  //       const user = admin.auth().getUserByEmail("danmincu@gmail.com").then(() => { 
  //         if (user.customClaims && user.customClaims.user_admin === true) {
  //           return;
  //          } 
  //          return admin.auth().setCustomUserClaims(user.uid, {
  //           user_admin: true
  //          })});
  //     }
  //   )
  // }

}
