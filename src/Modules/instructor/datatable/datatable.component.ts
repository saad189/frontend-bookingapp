import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { addHours, subHours } from 'date-fns';
import { Booking, BookingEditInfo } from 'src/Models/booking';
import { BOOKING_ACTION } from 'src/Models/constants';
import { ConfirmationComponent } from 'src/Modules/shared/Components/dialog-components/confirmation/confirmation.component';
import { EditBookingComponent } from 'src/Modules/shared/Components/dialog-components/edit-booking/edit-booking.component';
import { BookingService } from 'src/Services/Booking-Service/booking.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnChanges {

  @Input()
  bookingInformation: Booking[] = [];

  @Output()
  refreshBookings = new EventEmitter();

  displayedColumns: string[] = ['id', 'date', 'title', 'time', 'labName', 'uid', 'dateAdded', 'actions'];

  public dataSource: any;

  deleteAction = BOOKING_ACTION.deleteAction;
  editAction = BOOKING_ACTION.editAction;

  constructor(public dialog: MatDialog, private bookingService: BookingService, private datePipe: DatePipe) { }
  ngOnChanges(changes: SimpleChanges): void {

    const info = changes['bookingInformation'].currentValue;
    if (info) {
      this.bookingInformation = this.bookingInformation.map(booking =>
      ({
        ...booking, startTime: this.adjustLocalDate(new Date(booking.startTime)),
        endTime: this.adjustLocalDate(new Date(booking.endTime))
      }));

      this.mapBookingToDataSource();
    }
  }


  ngOnInit(): void {
  }

  mapBookingToDataSource(): void {
    this.dataSource = new MatTableDataSource(this.bookingInformation.map(({ id, labId, startTime, endTime, dateAdded, uid, title }: Booking) => ({
      id,
      date: startTime,
      title,
      time: `${this.datePipe.transform(new Date(startTime), 'HH00')} - ${this.datePipe.transform(new Date(endTime), 'HH00')}`,
      uid,
      labName: labId == 1 ? "CCNA Lab" : "Lab Not Available",
      dateAdded
    })));
  }

  adjustLocalDate(oldDate: Date): Date {
    let localDiffHours = oldDate.getTimezoneOffset() / 60;
    return localDiffHours > 0 ? subHours(oldDate, Math.abs(localDiffHours)) : addHours(oldDate, Math.abs(localDiffHours));
  }

  openBookingChangeDialog(action: string, id: number, labName: string) {
    const booking = this.bookingInformation.find(booking => booking.id === id) as Booking;
    const data: BookingEditInfo = {
      action, id, startTime: booking?.startTime, endTime: booking?.endTime
    }
    const dialogRef = this.dialog.open(EditBookingComponent, {
      width: "50%",
      height: "75%",
      minWidth: "40rem",
      minHeight: "45rem",
      data,
    });

    dialogRef.afterClosed().subscribe((result: BookingEditInfo) => {
      if (result) {
        this.editBooking(result, labName);
      }
    });

  }

  editBooking(actionInfo: BookingEditInfo, labName: string): void {

    if (actionInfo.action === BOOKING_ACTION.editAction) {
      this.bookingService.getBookingById(actionInfo.id).subscribe(({ id, labId, title, userId, uid, dateAdded }: Booking) => {
        const booking: Booking = {
          id,
          labId,
          title,
          userId,
          uid,
          dateAdded,
          startTime: actionInfo.startTime ?? new Date(),
          endTime: actionInfo.endTime ?? new Date()
        }

        this.bookingService.updateBooking(booking).subscribe(() => this.openConfirmationDialog(actionInfo, labName));
      });

    }
    else {
      this.bookingService.deteletBooking(actionInfo.id).subscribe(() => this.openConfirmationDialog(actionInfo, labName));
    }
  }

  openConfirmationDialog(actionInfo: BookingEditInfo, labName: string): void {
    this.refreshBookings.emit()
    this.dialog.open(ConfirmationComponent, {
      minWidth: "40rem",
      height: "30rem",
      data: {
        actionInfo: {
          ...actionInfo, labName
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
