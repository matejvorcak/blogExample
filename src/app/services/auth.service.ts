import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { LoggedUser } from '../classes/LoggedUser';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl : string = environment.api_url + "/login"
  logoutUrl : string = environment.api_url + "/logout"
  registerUrl : string = environment.api_url + "/register"
  userInfoUrl : string = environment.api_url + "/me"


  constructor(private http: HttpClient, public loggedUser: LoggedUser, private cookieService: CookieService) { }
  
  async login(login, password) {
    var bodyFormData = new FormData();
    bodyFormData.set('login', login);
    bodyFormData.set('password', password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };

    let res = await this.http.post(this.loginUrl, 
      bodyFormData).toPromise()
      if(res["errors"]){
        return res
      } else {
        this.loggedUser.setUser(res)
        this.cookieService.set("api_token_ang", this.loggedUser.api_token, (1/24))
        return this.loggedUser
    }
  }

  async me() {
    alert(this.userInfoUrl)
    if(this.cookieService.check("api_token_ang")){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          'Authorization': this.cookieService.get("api_token_ang") ,
          'Access-Control-Allow-Credentials': 'true'
        })
      };
      let res = await this.http.get(this.userInfoUrl, { headers: httpOptions.headers, withCredentials: true}).toPromise()
      if (res["errors"]) {
        return res
      } else {
        this.loggedUser.setUser(res)
        return this.loggedUser
      }
    }
  }

  async logout() {

  }

  async register(email, username, password) {
    var bodyFormData = new FormData();
    bodyFormData.set('email', email);
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Credentials': 'true'
      })
    };

    let res = await this.http.post(this.registerUrl,
      bodyFormData).toPromise()
    return res

  }

}
