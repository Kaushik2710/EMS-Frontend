import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { LeaveService } from '../../../core/service/leave.service';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.css',
})
export class ApplyLeaveComponent implements OnInit {
  manageStaffService: ManageStaffService = inject(ManageStaffService);
  leaveService: LeaveService = inject(LeaveService);
  authService: AuthService = inject(AuthService);
  toast: ToastrService = inject(ToastrService);
  userId!: any;
  userData!: any;
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.authService.getUserByEmail(this.userId).subscribe((res) => {
      this.userData = res;
    });
  }

  applyLeaveForm = new FormGroup({
    reason: new FormControl('', Validators.required),
    leaveFromDate: new FormControl('', Validators.required),
    leaveToDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  get reason(): FormControl {
    return this.applyLeaveForm.get('reason') as FormControl;
  }
  get leaveFromDate(): FormControl {
    return this.applyLeaveForm.get('leaveFromDate') as FormControl;
  }
  get leaveToDate(): FormControl {
    return this.applyLeaveForm.get('leaveToDate') as FormControl;
  }
  get description(): FormControl {
    return this.applyLeaveForm.get('description') as FormControl;
  }
  applyLeave() {
    const formData = new FormData();
    formData.append('reason', this.reason.value);
    formData.append('leaveFromDate', this.leaveFromDate.value);
    formData.append('leaveToDate', this.leaveToDate.value);
    formData.append('description', this.description.value);
    formData.append('register_id', this.userData.email);
    this.leaveService.submitLeaveRequest(formData).subscribe((res) => {
      this.applyLeaveForm.reset();
      this.toast.success('Sent Successfully', 'Success', {
        timeOut: 3000,
        closeButton: true,
      });
    });
  }
}
