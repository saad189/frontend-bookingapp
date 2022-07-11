import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/Models/booking';
import { BookingService } from 'src/Services/Booking-Service/booking.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  bookingInformation: Booking[] = [];

  constructor(private bookingService: BookingService) {
    this.getBookings();
  }

  ngOnInit(): void {
  }

  getBookings(): void {
    this.bookingService.getAllBookings().subscribe(response => {
      this.bookingInformation = response;
    })
  }
}
