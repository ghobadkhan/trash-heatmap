import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleOauthService {

  constructor(private http: HttpClient) { }

  getSessionParams() {
    this.http.get("/api/get-session").subscribe(response => {
      console.log(response)
      console.log(document.cookie.split(";"))
    })
  }
}
