import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { LoggedUser } from '../classes/LoggedUser';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  allNewsUrl : string = environment.api_url + "/news"

  constructor(private http: HttpClient, public loggedUser: LoggedUser) { }
  
  loadAllNews(){
    
  }

}
