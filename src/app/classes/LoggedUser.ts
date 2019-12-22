import { Injectable } from "@angular/core";
import { User } from "./User";

@Injectable({
    providedIn: 'root'
})
export class LoggedUser extends User {

    isLogged(): boolean {
        return this.api_token? true : false
    }

    constructor(){
        
        super({})
    }

    setUser(object) {
        this.api_token = object.api_token || null
        this.created_at = object.created_at || null
        this.first_name = object.first_name || null
        this.last_login = object.last_login || null
        this.last_name = object.last_name || null
        this.username = object.username || null
        this.image = "https://placeimg.com/40/40/people"
    }
}
