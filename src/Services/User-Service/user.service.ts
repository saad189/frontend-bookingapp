import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.ApiUrl + '/user';

  url = 'https://jsonplaceholder.typicode.com/users';
  users: string[] = [];
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `/${id}`);
  }

  updateUser(user: any, userId: number): Observable<any> {
    return this.http.put(this.apiUrl + `/${user.Id}`, user);
  }

  deteletUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user)
  }
}
