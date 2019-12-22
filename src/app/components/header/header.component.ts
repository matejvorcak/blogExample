import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/classes/LoggedUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loggedUser: LoggedUser, private authService: AuthService) { }

  ngOnInit() {

  }

  logout(): void{
    if(this.loggedUser.isLogged)
      this.authService.logout()
  }

  me(): void {
    this.authService.me()
  }

}
