import { Component, OnInit } from '@angular/core';
import { FauthService } from "../../shared/services/fauth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: FauthService
  ) { }

  ngOnInit() {
  }

}