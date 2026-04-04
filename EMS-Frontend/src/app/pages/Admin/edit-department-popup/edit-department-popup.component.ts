import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-department-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MatButtonModule, MatDialogModule],
  templateUrl: './edit-department-popup.component.html',
  styleUrl: './edit-department-popup.component.css',
})
export class EditDepartmentPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService,
    private ref: MatDialogRef<EditDepartmentPopupComponent>
  ) {}
  deptData: any;
  ngOnInit(): void {
    this.deptData = this.data;
    this.editDepartmentForm.setValue({
      departmentName: this.deptData.data.departmentName,
    });
  }
  editDept: ManageStaffService = inject(ManageStaffService);
  editDepartmentForm = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
  });
  get departmentName(): FormControl {
    return this.editDepartmentForm.get('departmentName') as FormControl;
  }
  submitEditDepartmentForm() {
    this.editDept
      .editDepartment(
        String(this.deptData.data.dept_id),
        this.editDepartmentForm.value
      )
      .subscribe((res) => {
        this.toast.success('Edited Successfully', 'success', {
          timeOut: 3000,
          closeButton: true,
        });
      });
    this.editDepartmentForm.reset();
    this.ref.close();
  }
}
