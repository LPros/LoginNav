import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

loading: Loading;
	retrievePasswordForm: FormGroup;
	returnedvalue: any = null;
	retrievePasswordMessage: any = null;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, private _auth: AuthService, private formBuilder: FormBuilder, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    	this.buildForm();
  	}

  	buildForm() {
  		this.retrievePasswordForm = this.formBuilder.group({
  			email: this.formBuilder.control('lael@coolility.com', 
			  Validators.compose([Validators.required, Validators.minLength(5)])
			)
  		});
  	}


  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');
  	}

  	onRetrievePasswordSubmit(): void {
/*		this.showLoading();  
  		this._auth.signInWithEmail({ email: this.retrievePasswordForm.get('email').value })
  		.then( (returnedValue) => {
			  //returnedValue is a string
			  setTimeout(() => {
					if (String(returnedValue) == "Okay") {
							//this.showNotification(returnedValue);
							console.log(returnedValue);
							this.loading.dismiss();
							//this.navCtrl.setRoot(HomePage);

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
		});*/
	}

	public goToLogin() {
    	this.navCtrl.push(LoginPage);
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

	showLoading() {
    	this.loading = this.loadingCtrl.create({
      		content: 'Please wait...'
    		});
    	this.loading.present();
  	}

}
