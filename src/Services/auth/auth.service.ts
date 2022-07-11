import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  isBefore
} from 'date-fns';
import { TOKEN_PROPERTIES } from 'src/Models/constants';
interface JwtModel {
  expiresAt: Date;
  idToken: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.ApiUrl + '/instructor';
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return isBefore(new Date(), this.getExpiration());
  }

  isLoggedOut() {
    return !this.isAuthenticated();
  }

  private setSession(authResult: JwtModel) {

    const expiresAt = new Date(authResult.expiresAt).getTime();

    localStorage.setItem(TOKEN_PROPERTIES.idToken, authResult.idToken);
    localStorage.setItem(TOKEN_PROPERTIES.exiresIn, JSON.stringify(expiresAt.valueOf()));
  }


  getExpiration() {
    const expiration = localStorage.getItem(TOKEN_PROPERTIES.exiresIn);
    let expiresAt = '';
    try {
      expiresAt = JSON.parse(expiration ?? '');
    } catch (ex) {
      console.log('JSON Error In expiresIn');
    }

    return new Date(expiresAt);
  }


  login(credentials: any) {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials).pipe(tap((res: any) => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem(TOKEN_PROPERTIES.idToken);
    localStorage.removeItem(TOKEN_PROPERTIES.exiresIn);
  }
}
