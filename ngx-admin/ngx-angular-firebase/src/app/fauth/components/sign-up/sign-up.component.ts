import { Component, OnInit } from '@angular/core';
import { FauthService } from "../../shared/services/fauth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(
    public authService: FauthService
  ) { }

  ngOnInit() { }

}