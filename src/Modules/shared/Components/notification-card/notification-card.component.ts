import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/Services/app-Service/app.service';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {

  imageUrl = `assets/images/notification_${this.appService.currentColorMode}.png`;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

}
