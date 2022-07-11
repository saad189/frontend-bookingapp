import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, finalize } from 'rxjs/operators';
import { AppNotificationService } from './app-notification-service/app-notification-service';
import { TOKEN_PROPERTIES } from 'src/Models/constants';



@Injectable({
  providedIn: 'root'
})
export class HttpInterceptService implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private notificationService: AppNotificationService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    const idToken = localStorage.getItem(TOKEN_PROPERTIES.idToken);

    const newRequest = idToken ? request.clone({
      headers: request.headers.set("Authorization",
        "Bearer " + idToken)
    }) : request;

    return next.handle(newRequest)
      .pipe(
        finalize(() => this.loaderService.hide()),
      ).pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {
          let errorMessage = 'No Response from Server!';
          console.log(err);

          if (err.error && err.status === 500) {
            errorMessage = 'Something went wrong on the Server!';
          }

          if (err.error && err.status !== 0) {

            errorMessage = typeof err.error === 'object' ? err.error.error.message : err.error;
          }

          this.notificationService.showError('Error!', errorMessage);
        }
        return new Observable<HttpEvent<any>>();
      }));
  }
}
