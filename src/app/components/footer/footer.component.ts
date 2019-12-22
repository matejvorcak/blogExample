import { Component, OnInit } from '@angular/core';
import { LoggedUser } from "../../classes/LoggedUser";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();


  constructor( public loggedUser: LoggedUser) { }

  ngOnInit() {
  }

}
