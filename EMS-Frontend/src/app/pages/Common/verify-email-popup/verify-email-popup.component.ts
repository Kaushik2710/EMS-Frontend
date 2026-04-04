import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OtpVerificationPopupComponent } from '../otp-verification-popup/otp-verification-popup.component';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './verify-email-popup.component.html',
  styleUrl: './verify-email-popup.component.css',
})
export class VerifyEmailPopupComponent {
  isLoading: boolean = false;
  authService: AuthService = inject(AuthService);
  toast: ToastrService = inject(ToastrService);
  constructor(
    private ref: MatDialogRef<VerifyEmailPopupComponent>,
    private dialog: MatDialog
  ) {}
  verifyEmailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
  });
  get id(): FormControl {
    return this.verifyEmailForm.get('email') as FormControl;
  }
  tempData: any;
  submitVerifyEmailForm() {
    this.isLoading = true;
    this.authService.verifyEmail(this.id.value).subscribe((res) => {
      this.tempData = res;
      if (this.tempData.status == true) {
        this.isLoading = false;
        this.ref.close();
        this.toast.success('OTP Sent To ' + this.tempData.email, 'Success', {
          timeOut: 5000,
          closeButton: true,
        });
        this.dialog.open(OtpVerificationPopupComponent, {
          width: '50%',
          enterAnimationDuration: '350ms',
          exitAnimationDuration: '350ms',
          data: {
            data: this.id.value,
          },
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
