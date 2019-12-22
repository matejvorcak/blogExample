import { Component, OnInit } from '@angular/core';
import {News } from './../../../classes/News'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news :News[] = [
    {title: "title1", text: "text"},
    {title: "title2", text: "text2"},
    {title: "title3", text: "text3"},
  ]

  constructor() { }

  ngOnInit() {
  }

}
