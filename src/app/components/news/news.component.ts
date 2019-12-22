import { Component, OnInit, Input } from '@angular/core';
import { News } from "../../classes/News";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input('news') news: News;
  
  constructor() { }

  ngOnInit() {
  }

}
