import { Component, OnInit } from '@angular/core';
import { GoogleOauthService } from '../google-oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private oauth:GoogleOauthService) {}
  ngOnInit(): void {
    this.oauth.getSessionParams()
  }

}
