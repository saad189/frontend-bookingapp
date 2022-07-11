import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingEditInfo, BookingEvent } from 'src/Models/booking';
import { BOOKING_ACTION } from 'src/Models/constants';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  backgroundColor = '';
  action = "";
  imageUrl = "assets/images/check.png";
  imageAlt = "Confirmation";

  bookingActions = BOOKING_ACTION;
  labName = '';
  event: BookingEvent | undefined;

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: { event?: BookingEvent, actionInfo: BookingEditInfo }) {

    const { event, actionInfo } = this.data;
    this.event = event;
    this.action = actionInfo.action ?? '';
    this.labName = actionInfo.labName ?? '';
    this.backgroundColor = this.action === BOOKING_ACTION.createAction ? '#00535d' : '#289f69';
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
