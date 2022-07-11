import { Injectable } from '@angular/core';
import { NotificationAnimationType, NotificationsService, Options } from 'angular2-notifications';
import { AppService } from '../app-Service/app.service';

@Injectable({
    providedIn: 'root'
})
export class AppNotificationService {

    constructor(private notificationService: NotificationsService, private appService: AppService) { }

    showSuccess(title: string, message: string): void {
        this.notificationService.success(title, message);
    }

    showWarning(title: string, message: string): void {
        this.notificationService.warn(title, message);
    }

    showError(title: string, message: string): void {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        this.notificationService.error(title, message, {
            timeOut: 4000,
            clickToClose: true,
            pauseOnHover: true,
            preventDuplicates: true,
            showProgressBar: false,
            animate: NotificationAnimationType.FromRight,
            theClass: `${this.appService.currentColorMode}-n`
        } as Options);

    }

    showInfo(title: string, message: string): void {
        this.notificationService.info(title, message);
    }

}
