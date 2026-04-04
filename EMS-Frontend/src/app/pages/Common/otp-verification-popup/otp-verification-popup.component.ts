import { NgClass } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordPopupComponent } from '../change-password-popup/change-password-popup.component';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verification-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './otp-verification-popup.component.html',
  styleUrl: './otp-verification-popup.component.css',
})
export class OtpVerificationPopupComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  toast: ToastrService = inject(ToastrService);
  timer: any;
  countdown: number = 75;
  isResendButtonVisible: boolean = false;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<OtpVerificationPopupComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }
  startTimer() {
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.isResendButtonVisible = true;
        clearInterval(this.timer);
      }
    }, 1000);
  }
  route: Router = inject(Router);
  verifyOtpForm = new FormGroup({
    otp: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{6}'),
    ]),
  });
  get otp(): FormControl {
    return this.verifyOtpForm.get('otp') as FormControl;
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `0${minutes} : ${remainingSeconds} `;
    return formattedTime;
  }
  tempData: any;
  submitVerifyOtpForm() {
    this.authService
      .verifyOtp(this.otp.value, this.data.data)
      .subscribe((res) => {
        this.tempData = res;
        if (this.tempData.status == true) {
          this.ref.close();
          this.toast.success('OTP Matched', 'Success', {
            timeOut: 5000,
            closeButton: true,
          });
          this.dialog.open(ChangePasswordPopupComponent, {
            width: '50%',
            enterAnimationDuration: '350ms',
            exitAnimationDuration: '350ms',
            data: {
              data: this.data.data,
            },
          });
        } else if (this.tempData.message == 'Invalid Email') {
          this.toast.error(
            this.tempData.email + ' Not Exist',
            'Invalid Email',
            {
              timeOut: 5000,
              closeButton: true,
            }
          );
        } else if (this.tempData.message == 'Not Match') {
          this.toast.error('OTP Not Exist', 'Not Match', {
            timeOut: 5000,
            closeButton: true,
          });
        } else {
          this.toast.error('OTP Expired!', 'Error', {
            timeOut: 5000,
            closeButton: true,
          });
        }
      });
  }
  resendOtp() {
    this.isLoading = true;
    this.authService.verifyEmail(this.data.data).subscribe((res) => {
      this.tempData = res;
      if (this.tempData.status == true) {
        this.isLoading = false;
        this.countdown = 75;
        this.isResendButtonVisible = false;
        this.startTimer();
        this.toast.success('OTP Sent To ' + this.tempData.email, 'Success', {
          timeOut: 5000,
          closeButton: true,
        });
      } else {
        this.isLoading = false;
        this.toast.error(this.tempData.email + ' Not Exist', 'Invalid Email', {
          timeOut: 5000,
          closeButton: true,
        });
      }
    });
  }
}
