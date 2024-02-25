import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealtimeService } from '../realtime.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private socket:RealtimeService, private httpClient: HttpClient) {}

  private window?: Window
  private got_api_token: boolean = false

  startLoginProcedure() {
    this.httpClient.get<any>("/api/g-auth").subscribe(response => {
      if (response.response === "OK") {
        this.window = window.open(response.redirect_uri,"_blank")!
        this.getToken(response.user_state)
        setTimeout(this.checkIfAuthenticated,300000)
      } else {
        // TODO: Replace this with a proper pop-up
        window.alert("Error in initial response from the server")
        console.error("Error in initial response from the server")
      }
    })
  }

  getToken(uuid:string) {
    this.socket.getMessage(uuid).subscribe(msg => {
      if (msg.response == "authenticated") {
        if (msg.api_token) {
          localStorage.setItem('api_token',msg.api_token)
          this.got_api_token = true
        } 
        else 
        console.error("Got authenticated but no api_token received")
      }
      this.window?.close()
      if (!this.got_api_token) {
        // TODO: Replace this with a proper pop-up
        window.alert("Can't get api_token")
      }
    })
  }

  checkIfAuthenticated() {
    if (!this.got_api_token) {
      this.window?.close()
      // TODO: Replace this with a proper pop-up
      window.alert("Got no response from Google or Server. Did you interact?")
    }
  }

  
}
