import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-department-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MatButtonModule, MatDialogModule],
  templateUrl: './add-department-popup.component.html',
  styleUrl: './add-department-popup.component.css',
})
export class AddDepartmentPopupComponent {
  constructor(
    private toast: ToastrService,
    private ref: MatDialogRef<AddDepartmentPopupComponent>
  ) {}
  addDept: ManageStaffService = inject(ManageStaffService);
  addDepartmentForm = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
  });
  get departmentName(): FormControl {
    return this.addDepartmentForm.get('departmentName') as FormControl;
  }
  submitAddDepartmentForm() {
    this.addDept
      .addDepartment(this.addDepartmentForm.value)
      .subscribe((res) => {
        this.toast.success('Added Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
      });
    this.addDepartmentForm.reset();
    this.ref.close();
  }
}
