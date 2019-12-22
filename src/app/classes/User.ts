
export class User{
    api_token: string
    created_at: Date
    first_name: string
    last_login: Date
    last_name: string
    username: string
    image: string

    constructor(object){
        this.api_token = object.api_token || null
        this.created_at = object.created_at || null
        this.first_name = object.first_name || null
        this.last_login = object.last_login || null
        this.last_name = object.last_name || null
        this.username = object.username || null
        this.image = object.image || null
    }
}