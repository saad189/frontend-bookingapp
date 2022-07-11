import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-word',
  templateUrl: './title-word.component.html',
  styleUrls: ['./title-word.component.scss']
})
export class TitleWordComponent implements OnInit {

  @Input()
  content: string | undefined;
  @Input()
  size: number = 5;

  constructor() { }

  ngOnInit() {
  }

}
