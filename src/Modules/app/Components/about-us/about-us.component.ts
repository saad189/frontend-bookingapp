import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/Services/app-Service/app.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUsImageUrl = '';

  constructor(private appService: AppService) {
    this.aboutUsImageUrl = `assets/images/about-us_${this.appService.currentColorMode}.png`;
  }

  ngOnInit(): void {
  }

}
