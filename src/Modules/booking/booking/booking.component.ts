import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CheckFreeSlotsComponent } from '../free-slots-booking/check-free-slots/check-free-slots.component';
import { SlotsViewComponent } from '../free-slots-booking/slots-view/slots-view.component';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  labId: string | null = "";
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    this.labId = this.activatedRoute.snapshot.paramMap.get('labId');
  }

  ngOnInit(): void {
  }

  checkFreeSlots(): void {
    const dialogRef = this.dialog.open(CheckFreeSlotsComponent, {
      width: "300px",
      data: {
        labId: this.labId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.viewFreeSlots(result);
      }
    });
  }

  viewFreeSlots(date: Date) {
    const dialogRef = this.dialog.open(SlotsViewComponent, {
      width: "500px",
      data: {
        date, labId: this.labId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}

