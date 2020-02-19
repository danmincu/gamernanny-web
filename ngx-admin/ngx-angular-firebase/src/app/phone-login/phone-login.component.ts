import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WindowService } from '../window.service';
import { AuthService } from '../core/auth.service'
import { Router } from '@angular/router';
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
    private router: Router,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {   
    this.windowRef = this.win.windowRef;    
    var self = this;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',
    {
      'size': 'normal',      
      'callback': (response) => { 
         self.hideReCaptcha();
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        self.showReCaptcha()
      }
    });
    
    this.windowRef.recaptchaVerifier.render();
  }

  hideReCaptcha(){ 
      setTimeout(() => {
      this.hideCaptcha = true;      
      this.cdRef.detectChanges();}, 1000)
  }

  showReCaptcha(){ 
    setTimeout(() => {
    this.hideCaptcha = false;      
    this.cdRef.detectChanges();}, 1000)
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;    

    // console.log(appVerifier);

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