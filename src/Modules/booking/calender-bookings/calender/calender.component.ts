import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  addHours,
  subHours,
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subWeeks,
} from 'date-fns';
import { of, Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { EditBookingComponent } from 'src/Modules/shared/Components/dialog-components/edit-booking/edit-booking.component';
import { MatDialog } from '@angular/material/dialog';
import { Booking, BookingEditInfo, BookingEvent } from 'src/Models/booking';
import { BOOKING_ACTION, LABNAMES } from 'src/Models/constants';
import { UserInfoInputComponent } from 'src/Modules/shared/Components/dialog-components/user-info-input/user-info-input.component';
import { BookingService } from 'src/Services/Booking-Service/booking.service';
import { ConfirmationComponent } from 'src/Modules/shared/Components/dialog-components/confirmation/confirmation.component';
import { ViewBookingComponent } from 'src/Modules/shared/Components/dialog-components/view-booking/view-booking.component';
import { AppService } from 'src/Services/app-Service/app.service';


const colorsNormal: any = {
  red: {
    primary: 'rgb(173, 33, 33)',
    secondary: 'rgb(250, 227, 227)',
  },
  blue: {
    primary: 'rgb(30, 144, 255)',
    secondary: 'rgb(209, 232, 255)',
  },
  yellow: {
    primary: 'rgb(227, 188, 8)',
    secondary: 'rgb(253, 241, 186)',
  },
};

const colors: any = {

}

function addPeriod(period: CalendarView, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarView, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarView, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarView, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalenderComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  activeDayIsOpen: boolean = false; // To open current Day Data on default

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  clickedDate: Date | undefined;

  refresh = new Subject<void>();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  minDate: Date = subDays(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 3);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  // Events or Bookings Stored on Calender
  events: CalendarEvent[] = [];

  bookings: Booking[] = [];

  segmentHeight = 60;

  constructor(
    private dialog: MatDialog,
    private bookingService: BookingService,
    private appService: AppService
  ) {
    this.getAllBookings();
  }

  ngOnInit(): void {
    (Object.values(colorsNormal) as []).forEach(({ primary, secondary }, i) => {
      colors[i.toString()] = {
        primary: this.appService.getSimulatedColor(primary),
        secondary: this.appService.getSimulatedColor(secondary)
      }
    });
  }

  getAllBookings() {

    this.bookingService.getAllBookings().subscribe(response => {
      this.bookings = response;
      this.mapBookingEventToCalenderEvent(response);
    });
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }


  mapBookingEventToCalenderEvent(bookingEvents: Booking[]): void {
    const colorsLength = Object.keys(colors).length;

    this.events = bookingEvents.map(({ startTime, endTime, title, uid, id, userId }, i) => {
      let start = new Date(startTime);
      let end = new Date(endTime);

      start = this.adjustLocalDate(start);
      end = this.adjustLocalDate(end);
      return {
        id, start, end, title: `${title} - ${uid}`, color: colors[userId % colorsLength], actions: this.actions
      }

    });
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.clickedDate = date;
    this.openCreateEventDialog();
  }


  adjustLocalDate(oldDate: Date): Date {
    let localDiffHours = oldDate.getTimezoneOffset() / 60;
    return localDiffHours > 0 ? subHours(oldDate, Math.abs(localDiffHours)) : addHours(oldDate, Math.abs(localDiffHours));
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const booking = this.bookings.find(booking => booking.id === event.id) as Booking;

    this.dialog.open(ViewBookingComponent, {
      width: "50rem",
      height: "45rem",
      data: { ...booking, startTime: this.adjustLocalDate(new Date(booking.startTime)), endTime: this.adjustLocalDate(new Date(booking.endTime)) }
    });
  }

  openCreateEventDialog(): void {
    const data: BookingEditInfo = {
      action: BOOKING_ACTION.createAction,
      id: 0,
      startTime: this.clickedDate,
      labName: LABNAMES.ccna
    }
    const dialogRef = this.dialog.open(EditBookingComponent, {
      data,
      width: "50%",
      height: "45rem",
      minWidth: "40rem",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const secondDialog = this.dialog.open(UserInfoInputComponent, {
          data: result,
          width: "50%",
          height: "90%",
          minWidth: "40rem",
          minHeight: "45rem",
        });
        secondDialog.afterClosed().subscribe((bookingObject: BookingEvent) => {
          this.sendBookingData(data, bookingObject)
        })
      }
    });
  }


  private sendBookingData(actionInfo: BookingEditInfo, event: BookingEvent): void {
    if (event) {
      this.bookingService.createBooking(event).subscribe((response) => {
        if (response) {
          this.dialog.open(ConfirmationComponent, {
            width: "50rem",
            height: "40rem",
            data: {
              actionInfo,
              event
            }
          });

          this.getAllBookings();
        }
      });
    }
  }




  setView(view: CalendarView) {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );

    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.dateOrViewChanged();
  }
}
