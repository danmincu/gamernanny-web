import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Reactive Form
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { FauthRoutingModule } from './shared/routing/fauth-routing.module';

// App components
import { FauthComponent } from './fauth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

// Auth service
import { FauthService } from "./shared/services/fauth.service";

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,  
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
} from '@nebular/theme';

import { NbAuthModule } from '@nebular/auth';
import { ClaimGrantedDirective } from './directives/claim-granted.directive';
import { LoginGrantedDirective } from './directives/login-granted.directive';


@NgModule({
  declarations: [
    ClaimGrantedDirective,
    LoginGrantedDirective,
    FauthComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent    
  ],
  imports: [
    NbAuthModule, 
    NbLayoutModule,
    NbSelectModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,    
    NbButtonModule,
    NbIconModule,
    CommonModule,
    FauthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [FauthComponent, ClaimGrantedDirective, LoginGrantedDirective],
  providers: [FauthService]
})

export class FauthModule { }