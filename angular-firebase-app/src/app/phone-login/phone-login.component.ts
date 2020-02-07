import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WindowService } from '../window.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import * as firebase from 'firebase';
import { PhoneNumber } from './phone-number';

@Component({
  selector: 'phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  public hideCaptcha : boolean = false;

  constructor(private win: WindowService, 
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {   
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    console.log(appVerifier);

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;
                this.hideCaptcha = true;

            })
            .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    this.user = result.user;

    })
    .then(res => {
      this.router.navigate(['/user']);
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

}