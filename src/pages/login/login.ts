import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
	loading: Loading;
	loginForm: FormGroup;
	returnedvalue: any = null;
	loginMessage: any = null;

	//items: FirebaseListObservable<any[]>;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, private _auth: AuthService, private formBuilder: FormBuilder, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  		//this.items = af.database.list('/items');
    	this.buildForm();
  	}

  	buildForm() {
  		this.loginForm = this.formBuilder.group({
  			email: this.formBuilder.control('', 
			  Validators.compose([Validators.required, Validators.minLength(5)])
			),
  			password: this.formBuilder.control('',
				Validators.compose([Validators.required, Validators.minLength(4)])  
			)
  		});
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');
  	}

  	onLoginSubmit(): void {
		this.showLoading();  
  		this._auth.signInWithEmail({ email: this.loginForm.get('email').value, password: this.loginForm.get('password').value })
  		.then( (returnedValue) => {
			  //returnedValue is a string
			  setTimeout(() => {
					if (String(returnedValue) == "Okay") {
							//this.showNotification(returnedValue);
							console.log(returnedValue);
							this.loading.dismiss();
							this.navCtrl.setRoot(HomePage);

					} else {
						this.loading.dismiss();
						this.showNotification(returnedValue);
					}	
			  }, 500) //end setTimeout	
		}) //end then
		.catch((err) => {
			this.loading.dismiss();
			console.log(err);
			this.showNotification(err);
		});
	}

	public goToRegister() {
    	this.navCtrl.push(RegisterPage);
  	}

	showNotification(text) {	
		let toast = this.toastCtrl.create({
      		message: text,
      		duration: 3000
    	});
    	toast.present();    
		/*let alert = this.alertCtrl.create({
      		title: 'Notification',
      		subTitle: text,
      		buttons: ['OK']
    	});
		alert.present(prompt);*/
  	}

	signOutWithEmail() {
  		this._auth.signOut();
  	}

	goToForgotPassword() {
  		this.navCtrl.push(ForgotPasswordPage);
  	}

	showLoading() {
    	this.loading = this.loadingCtrl.create({
      		content: 'Please wait...'
    		});
    	this.loading.present();
  	}

}
