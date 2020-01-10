import { Component, OnInit } from '@angular/core';
import {News } from './../../../classes/News'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news :News[] = [
    new News("",""),
    new News("",""),
    new News("",""),
  ]

  createNews(){
    this.news.push(new News("",""))
  }

  constructor() { }

  ngOnInit() {
  }

}
