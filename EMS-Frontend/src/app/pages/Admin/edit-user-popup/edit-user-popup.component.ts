import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-popup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, NgClass, ReactiveFormsModule],
  templateUrl: './edit-user-popup.component.html',
  styleUrl: './edit-user-popup.component.css',
})
export class EditUserPopupComponent {
  deptService: ManageStaffService = inject(ManageStaffService);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditUserPopupComponent>,
    private manageStaff: ManageStaffService,
    private toast: ToastrService
  ) {}
  userData: any;
  deptArray: any;
  ngOnInit(): void {
    this.deptService.getAllDepartment().subscribe((res) => {
      this.deptArray = res;
    });
    this.userData = this.data;
    this.editUserForm.setValue({
      fname: this.userData.data.fname,
      lname: this.userData.data.lname,
      email: this.userData.data.email,
      phone: this.userData.data.phone,
      department: this.userData.data.department,
      dateOfBirth: this.userData.data.dateOfBirth,
      dateOfJoining: this.userData.data.dateOfJoining,
      salary: this.userData.data.salary,
    });
  }
  editUserForm = new FormGroup({
    fname: new FormControl('', [
      Validators.required,
      Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){3,30}"),
    ]),
    lname: new FormControl('', [
      Validators.required,
      Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){3,30}"),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[6-9][0-9]{9}$'),
    ]),
    department: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    dateOfJoining: new FormControl('', [Validators.required]),
    salary: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{5,}$'),
    ]),
  });
  get fname(): FormControl {
    return this.editUserForm.get('fname') as FormControl;
  }
  get lname(): FormControl {
    return this.editUserForm.get('lname') as FormControl;
  }
  get id(): FormControl {
    return this.editUserForm.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.editUserForm.get('phone') as FormControl;
  }
  get department(): FormControl {
    return this.editUserForm.get('department') as FormControl;
  }
  get date(): FormControl {
    return this.editUserForm.get('dateOfBirth') as FormControl;
  }
  get doj(): FormControl {
    return this.editUserForm.get('dateOfJoining') as FormControl;
  }
  get salary(): FormControl {
    return this.editUserForm.get('salary') as FormControl;
  }
  closePopup() {
    this.ref.close();
  }
  editUser() {
    const formData = new FormData();
    formData.append('fname', this.fname.value);
    formData.append('lname', this.lname.value);
    formData.append('email', this.id.value);
    formData.append('phone', this.phone.value);
    formData.append('department', this.department.value);
    formData.append('dateOfBirth', this.date.value);
    formData.append('dateOfJoining', this.doj.value);
    formData.append('salary', this.salary.value);
    this.manageStaff
      .editUser(this.userData.data.email, formData)
      .subscribe((res) => {
        this.closePopup();
        this.toast.success('Edit Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
      });
  }
}
