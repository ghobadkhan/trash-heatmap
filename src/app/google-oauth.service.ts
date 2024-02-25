import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleOauthService {

  constructor(private http: HttpClient) { }
  
  testSession(name:string) {

    const params = {
      name: name
    }

    this.http.get("/api/",{params})
    .subscribe(response => {
      console.log(response)
    })
  }

  getSessionParams() {
    this.http.get("/api/get-session").subscribe(() => {
      console.log(document.cookie.split(";"))
    })
  }
}
