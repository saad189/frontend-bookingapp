import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-slots-view',
  templateUrl: './slots-view.component.html',
  styleUrls: ['./slots-view.component.scss']
})
export class SlotsViewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SlotsViewComponent>, @Inject(MAT_DIALOG_DATA) public labInfo: { date: Date, labId: string }) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
