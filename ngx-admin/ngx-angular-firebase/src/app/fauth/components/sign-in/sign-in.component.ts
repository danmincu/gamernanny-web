import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FauthService } from "../../shared/services/fauth.service";
import { WindowService } from '../../window.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { PhoneNumber, CountryCodes } from './phone-number';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  user: any;
  CC = CountryCodes;

  public hideCaptcha : boolean = false;
  public hideSendSms : boolean = true;
  public showVerificationCode : boolean = false;


  constructor(private win: WindowService, 
    public authService: FauthService,
    private router: Router,
    private cdRef: ChangeDetectorRef,  
    public ngZone: NgZone // NgZone service to remove outside scope warning    
    ) { }

  ngOnInit() {   
    this.phoneNumber.country = "1";
    this.windowRef = this.win.windowRef;    
    this.windowRef.confirmationResult = null;
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
      this.hideSendSms = false;
      this.cdRef.detectChanges();}, 1000)
  }

  showReCaptcha(){ 
    setTimeout(() => {
    this.hideCaptcha = false;
    this.hideSendSms = true;     
    this.cdRef.detectChanges();}, 1000)
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;    
    const num = this.phoneNumber.e164;
    let thisref = this;

    // firebase.auth().signInWithPhoneNumber(num, appVerifier)
    this.authService.PhoneAuth(num, appVerifier)
            .then(result => {
                setTimeout( () => {
                  thisref.windowRef.confirmationResult = result;
                  thisref.hideCaptcha = true;
                  thisref.hideSendSms = true;
                  thisref.cdRef.markForCheck();
                  thisref.cdRef.detectChanges();
                }, 1000);                
            })
            .catch( error =>
              { 
                window.alert(error);
                this.showReCaptcha();
              });
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then(result => {
                    //console.log(`verification success ${result.user}`);
                    this.user = result.user;
    }).then(res => {
      //console.log('try to navigate');
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      })    
    })
    .catch( error =>window.alert(`Incorrect code entered? ${error}`));
  }
}