import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from 'src/Models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl = environment.ApiUrl + '/booking';
  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBookingById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `/${id}`);
  }

  updateBooking(booking: Booking): Observable<any> {
    return this.http.put(this.apiUrl + `/${booking.id}`, booking);
  }

  deteletBooking(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  createBooking(booking: any): Observable<any> {
    return this.http.post(this.apiUrl, booking)
  }
}
