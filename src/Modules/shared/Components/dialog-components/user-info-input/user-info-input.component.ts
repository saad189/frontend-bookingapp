import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingEditInfo, BookingEvent } from 'src/Models/booking';
import { BOOKING_ACTION, LAB_INFO } from 'src/Models/constants';
import { AppService } from 'src/Services/app-Service/app.service';

@Component({
  selector: 'app-user-info-input',
  templateUrl: './user-info-input.component.html',
  styleUrls: ['./user-info-input.component.scss']
})
export class UserInfoInputComponent implements OnInit {


  personUrl = "assets/icons/person.png";
  emailUrl = "assets/icons/email.png";
  titleUrl = "assets/icons/title.png";
  imageUrl = "";
  imageAlt = "";
  action = "";

  editInfo: BookingEvent | undefined;
  backgroundColor = '';
  userForm: FormGroup;
  bookingActions = BOOKING_ACTION;

  constructor(public dialogRef: MatDialogRef<UserInfoInputComponent>, @Inject(MAT_DIALOG_DATA) public data: BookingEditInfo,
    private router: Router, private fb: FormBuilder, private appService: AppService) {
    this.action = data.action;
    this.imageUrl = `assets/images/${data.action}_${this.appService.currentColorMode}.png`;
    this.backgroundColor = this.action === BOOKING_ACTION.createAction ? '#00535d' : '#289f69';

    const labName = this.router.url.slice(this.router.url.lastIndexOf('/'));
    this.userForm = this.fb.group({
      bookingTitle: ['', Validators.required],
      userId: ['', Validators.required],
      email: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  closeDialog(confirm: boolean) {

    if (!confirm) {
      this.dialogRef.close();
      return;
    }

    const title = this.userForm.controls['bookingTitle'].value;
    const uid = this.userForm.controls['userId'].value;
    const email = this.userForm.controls['email'].value;

    this.editInfo = {
      start: this.data.startTime ?? new Date(),
      end: this.data.endTime ?? new Date(),
      labId: LAB_INFO.ccna,
      title,
      email,
      uid
    }

    this.dialogRef.close(this.editInfo);

  }

}
