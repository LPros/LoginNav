import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _auth: AuthService) {
    
  }


	signOutWithEmail() {
  		this._auth.signOut();
      this.navCtrl.setRoot(LoginPage);
  	}

}
