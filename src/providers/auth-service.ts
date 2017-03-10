import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFire, AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  private authStateBool: Boolean;

  constructor(public http: Http, public auth$: AngularFireAuth, public af: AngularFire) {
    //Remember, the app.module already initialized the AngularFireModule with Auth details
    this.af.auth.subscribe((auth: FirebaseAuthState) => {
      if (auth) {
        this.authStateBool = true;
        console.log("logged In");
      } else {
        this.authStateBool = false;
        console.log("logged Out");
      }
      console.log(auth);
      this.authState = auth;

    }//, console.log(error)
    );

    //I may only need this for facebook;
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    //This only works when queried distinctly after the first iteration of loading the auth state
    //To detect the first state, you need to inject angularfire and detect directly.
    return this.authStateBool == true;
  }

  registerWithEmail(userRegisterDetails: any) {
    //return this.af.auth.createUser(userRegisterDetails);
    return this.af.auth.createUser(userRegisterDetails)
      .then(_ => {
        //route to home page
        return "Okay";
      },

      (err) => {
        console.log(err['code']);
        //password doesn't qualify
        //auth/weak-password - 6 chars or longer
        //need a password
        //auth/invalid-user-token
        //auth/network-request-failed
        //auth/requires-recent-login
        //auth/too-many-requests
        //auth/user-disabled

        if (err['code'] == "auth/email-already-in-use") {
          console.log(err);
          return "The email is already registered.";
        } else if (err['code'] == "auth/weak-password") {
          console.log(err);
          return "Password must be 6 characters or longer.";
        } else if (err['code'] == "auth/invalid-email") {
          console.log(err);
          return "Please enter a full email address.";
        } else {
          console.log(err);
        }
      });
  }

  signInWithEmail(userLoginDetails: any): firebase.Promise<FirebaseAuthState> {
    //return this.af.auth.login({ email: '', password: '' });
    //console.log(this.af.auth.login(userLoginDetails));
    return this.af.auth.login(userLoginDetails)
      .then(_ => {
        return "Okay";
      },

      (err) => {
        console.log(err['code']);
        if (err['code'] == "auth/wrong-password") {
          console.log(err);
          return "That password does not match what we have on file.";
        } else if (err['code'] == "auth/user-not-found") {
          console.log(err);
          return "We couldn't find that user in our records. Go ahead and register.";
        } else if (err['code'] == "auth/invalid-email") {
          console.log(err);
          return "Please enter a full email address.";
        } else {
          console.log(err);
        }
      });
  }

  signOut(): void {
    //route to login page
    this.af.auth.logout();
  }




  //Facebook =====================================================
  /*	signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
      return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
      });
    }
  
    displayName(): string {
      if (this.authState != null) {
      return 		this.authState.facebook.displayName;
          } else {
            return '';
      }
    }*/

  //Cordova Differences =====================================================
  /*	constructor(public auth$: AngularFireAuth, private platform: Platform) {
        this.authState = auth$.getAuth();
        auth$.subscribe((state: FirebaseAuthState) => {
          this.authState = state;
        });
      }
   
    signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
        if (this.platform.is('cordova')) {
          return Facebook.login(['email', 'public_profile']).then(res => {
              const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
              return firebase.auth().signInWithCredential(facebookCredential);
          });
      } else {
          return this.auth$.login({
              provider: AuthProviders.Facebook,
              method: AuthMethods.Popup
          });
        }
    }*/

}
