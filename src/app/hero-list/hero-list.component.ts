import { Component, OnInit } from '@angular/core';
import data from 'jsons/routes.json';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      console.log(data);
  }

}
