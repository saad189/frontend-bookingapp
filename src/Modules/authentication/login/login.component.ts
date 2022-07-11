import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageInfo } from 'src/Models/image-info';
import { MODULE_ADDRESS } from 'src/Models/modules';
import { AuthService } from 'src/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  hide = true;
  imageInfo: ImageInfo = {
    url: 'assets/icons/instructor.png',
    alt: 'Generic User Icon'
  }
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {
    const val = { userId: this.userForm.controls['userId'].value, password: this.userForm.controls['password'].value }

    if (val.userId && val.password) {
      this.authService.login(val)
        .subscribe(
          () => {
            this.checkLogin();
          }
        );
    }
  }

  checkLogin() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/${MODULE_ADDRESS.INSTRUCTOR_PANEL}`]);
    }
  }

}
