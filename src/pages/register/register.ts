import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})

export class RegisterPage {
	loading: Loading;
	registerForm: FormGroup;
	returnedvalue: any = null;
	registerMessage: any = null;

		//items: FirebaseListObservable<any[]>;

		constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, private _auth: AuthService, private formBuilder: FormBuilder, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController) {
			//this.items = af.database.list('/items');
			this.buildForm();
			//this.af.auth.subscribe(auth => console.log(auth));
		}

		buildForm() {
			//all fields required
			//hints
			this.registerForm = this.formBuilder.group({
					firstName: this.formBuilder.control('Lael'/*, Validators.compose([Validators.required, Validators.minLength(1)])*/
				),
					lastName: this.formBuilder.control('Cox'/*, Validators.compose([Validators.required, Validators.minLength(2)])*/
				),
					email: this.formBuilder.control('lael@coolility.com'/*, Validators.compose([Validators.required, Validators.minLength(5)])*/
				),
					password: this.formBuilder.control('password'/*, Validators.compose([Validators.required, Validators.minLength(4)])*/
				)
			});
		}

		ionViewDidLoad() {
			console.log('ionViewDidLoad RegisterPage');
		}

		onRegistrationSubmit(): void {
			this.showLoading();
			this._auth.registerWithEmail({ email: this.registerForm.get('email').value, password: this.registerForm.get('password').value })
			.then( (returnedValue) => {
				this.registerMessage = returnedValue;
				setTimeout(() => {
					if (String(returnedValue) == "Okay") {
						console.log(returnedValue);
						this.loading.dismiss();
						this.navCtrl.setRoot(RegisterPage);
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
