import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/Services/app-Service/app.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  bookingLogoUrl = `assets/images/bookingAppLogo_${this.appService.currentColorMode}.png`;
  secondImageUrl = "";

  background = `linear-gradient(
    0deg,
    rgba(40, 159, 105, 1) 0%,
    rgba(183, 223, 205, 1) 100%,
    rgba(255, 255, 255, 1) 10%
  );`

  title = "BOOKING APP";

  constructor(private appService: AppService) {
    this.background = `linear-gradient(
        0deg,
        ${this.appService.getSimulatedColor('rgb(40,159,105)')} 0%,
        ${this.appService.getSimulatedColor('rgb(183,223,205)')} 100%,
        ${this.appService.getSimulatedColor('rgb(255,255,255)')} 10%
      );`
  }
  ngOnInit(): void {

  }
}
