import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { WindowService } from '../window.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import * as firebase from 'firebase';
import { PhoneNumber } from './phone-number';
import { Observable } from 'rxjs';

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
      'callback': (a) => { 
          self.hideIt();
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });
    
    this.windowRef.recaptchaVerifier.render();
  }

  hideIt(){ 
    setTimeout(() => {
    this.hideCaptcha = true;
    console.log("should be hidden");
    this.cdRef.detectChanges();
  }, 1000)
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