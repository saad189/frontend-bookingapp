import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-check-free-slots',
  templateUrl: './check-free-slots.component.html',
  styleUrls: ['./check-free-slots.component.scss']
})
export class CheckFreeSlotsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CheckFreeSlotsComponent>, @Inject(MAT_DIALOG_DATA) public labId: string) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(new Date());
  }

}
