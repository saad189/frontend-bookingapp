import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Booking, BookingEvent } from 'src/Models/booking';
import { LABNAMES } from 'src/Models/constants';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss']
})
export class ViewBookingComponent implements OnInit {
  backgroundColor = '';
  action = "";
  imageUrl = "assets/images/check.png";
  imageAlt = "View Booking";

  labName = '';

  event: Booking;
  constructor(public dialogRef: MatDialogRef<ViewBookingComponent>, @Inject(MAT_DIALOG_DATA) public data: Booking, private router: Router) {
    this.event = this.data;
    this.backgroundColor = '#00535d';
    this.labName = LABNAMES.ccna;
  }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
