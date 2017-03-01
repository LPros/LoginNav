import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { VisualPage } from '../visual/visual';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  rootPage: any = VisualPage;

  constructor(public navCtrl: NavController, public menu: MenuController, private _auth: AuthService) {




    //this.menu.enable(true, 'menu');
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
  }

  signOutWithEmail() {
    this._auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
