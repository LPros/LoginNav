import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-visual',
  templateUrl: 'visual.html'
})
export class VisualPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualPage');
  }

  signOutWithEmail() {
    this._auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
