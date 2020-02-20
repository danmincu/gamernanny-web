//import { BrowserModule } from '@angular/platform-browser';
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
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

// Auth service
import { FauthService } from "./shared/services/fauth.service";
import { AuthGuard } from './shared/guard/auth.guard';


//import { NbAuthBlockComponent } from '@nebular/theme/';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import { NbAuthModule } from '@nebular/auth';
import { FIsGrantedDirective } from './directives/f-is-granted.directive';


@NgModule({
  declarations: [
    FIsGrantedDirective,
    FauthComponent,
    SignInComponent,
    SignUpComponent,
   // DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent    
  ],
  imports: [

    NbAuthModule, 
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,


    //   BrowserModule,
    CommonModule,
    FauthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [FauthComponent,  FIsGrantedDirective],
  providers: [FauthService],
  // bootstrap: [FauthComponent]
})

export class FauthModule { }