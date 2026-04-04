import { Component, Inject, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './change-password-popup.component.html',
  styleUrl: './change-password-popup.component.css',
})
export class ChangePasswordPopupComponent {
  authService: AuthService = inject(AuthService);
  toast: ToastrService = inject(ToastrService);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ChangePasswordPopupComponent>
  ) {}
  changePasswordForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,}$/
        ),
      ]),
      cPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );
  get password(): FormControl {
    return this.changePasswordForm.get('password') as FormControl;
  }
  get cPassword(): FormControl {
    return this.changePasswordForm.get('cPassword') as FormControl;
  }
  passwordMatchValidator(control: AbstractControl) {
    if (
      control.get('password')?.value.toString() != '' &&
      control.get('cPassword')?.value.toString() != ''
    ) {
      return control.get('password')?.value === control.get('cPassword')?.value
        ? { mismatch: false, match: true }
        : { mismatch: true, match: false };
    } else {
      return { match: false };
    }
  }
  tempData: any;
  submitChangePasswordForm() {
    const formData = new FormData();
    formData.append('newPassword', this.password.value);
    this.authService
      .changePassword(formData, this.data.data)
      .subscribe((res) => {
        this.tempData = res;
        if (this.tempData.status == true) {
          this.ref.close();
          this.toast.success('Password Changed Successfully', 'Success', {
            timeOut: 5000,
            closeButton: true,
          });
        }
      });
  }
}
