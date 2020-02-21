import { Component, OnInit } from '@angular/core';
import { FauthService } from "../../shared/services/fauth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: FauthService
  ) { }

  ngOnInit() {
  }

}