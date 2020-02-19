import { BrowserModule } from '@angular/platform-browser';
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
import { AuthService } from "./shared/services/auth.service";


@NgModule({
  declarations: [
    FauthComponent,
    SignInComponent,
    SignUpComponent,
   // DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    FauthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  // bootstrap: [FauthComponent]
})

export class FauthModule { }