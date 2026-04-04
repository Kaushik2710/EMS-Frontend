import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ManageStaffService } from '../../../core/service/manage-staff.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  constructor(private router: Router, private toast: ToastrService) {}
  authService: AuthService = inject(AuthService);
  manageStaff: ManageStaffService = inject(ManageStaffService);
  userData: any;
  skillArray: any[] = [];
  userId: string | null = '';
  deptData: any;
  ngOnInit(): void {
    this.loaddata();
  }
  issubmitted: boolean = false;
  countryArray: string[] = ['India', 'USA', 'Canada', 'Germany'];

  loaddata() {
    this.userId = localStorage.getItem('id');
    this.manageStaff.getAllDepartment().subscribe((res) => {
      this.deptData = res;
    });
    this.authService.getUserByEmail(this.userId).subscribe((res) => {
      this.userData = res;
      this.updateProfileForm.setValue({
        fname: this.userData.fname,
        lname: this.userData.lname,
        email: this.userData.email,
        phone: this.userData.phone,
        image: '',
        salary: this.userData.salary,
        gender: this.userData.gender,
        department: this.userData.department,
        dateOfBirth: this.userData.dateOfBirth,
        dateOfJoining: this.userData.dateOfJoining,
        address: {
          street: this.userData.address.street,
          country: this.userData.address.country,
          city: this.userData.address.city,
          region: this.userData.address.region,
          postalcode: this.userData.address.postalcode,
        },
      });
    });
  }
  updateProfileForm = new FormGroup({
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
    image: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[6-9][0-9]{9}$'),
    ]),
    salary: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{5,}$'),
    ]),
    gender: new FormControl('male', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    dateOfJoining: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl(null, Validators.required),
      country: new FormControl('India', Validators.required),
      city: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      postalcode: new FormControl(null, Validators.required),
    }),
  });
  formGroup: any;
  get fname(): FormControl {
    return this.updateProfileForm.get('fname') as FormControl;
  }
  get lname(): FormControl {
    return this.updateProfileForm.get('lname') as FormControl;
  }
  get id(): FormControl {
    return this.updateProfileForm.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.updateProfileForm.get('phone') as FormControl;
  }
  get gender(): FormControl {
    return this.updateProfileForm.get('gender') as FormControl;
  }
  get department(): FormControl {
    return this.updateProfileForm.get('department') as FormControl;
  }
  get image(): FormControl {
    return this.updateProfileForm.get('image') as FormControl;
  }
  get date(): FormControl {
    return this.updateProfileForm.get('dateOfBirth') as FormControl;
  }
  get doj(): FormControl {
    return this.updateProfileForm.get('dateOfJoining') as FormControl;
  }

  get street(): FormControl {
    return this.updateProfileForm.get('address.street') as FormControl;
  }
  get postal(): FormControl {
    return this.updateProfileForm.get('address.postalcode') as FormControl;
  }
  get region(): FormControl {
    return this.updateProfileForm.get('address.region') as FormControl;
  }
  get city(): FormControl {
    return this.updateProfileForm.get('address.city') as FormControl;
  }
  get country(): FormControl {
    return this.updateProfileForm.get('address.country') as FormControl;
  }
  get salary(): FormControl {
    return this.updateProfileForm.get('salary') as FormControl;
  }

  filetoUpload!: File;
  isChanged: any = false;
  isPasswordChanged: any = false;
  onChangeFileField(event: any) {
    this.filetoUpload = event.target.files[0];
    this.isChanged = true;
  }

  submitUpdateProfileForm() {
    if (this.id.dirty) {
      localStorage.setItem('id', this.id.value);
      console.log('Dirty');
    }
    const addressObj: any = {
      street: this.street.value,
      postalcode: this.postal.value,
      region: this.region.value,
      city: this.city.value,
      country: this.country.value,
    };

    if (this.updateProfileForm.dirty) {
      const formData = new FormData();
      formData.append('fname', this.fname.value);
      formData.append('lname', this.lname.value);
      formData.append('email', this.id.value);
      formData.append('phone', this.phone.value);
      formData.append('gender', this.gender.value);
      formData.append('department', this.department.value);
      formData.append('dateOfBirth', this.date.value);
      formData.append('dateOfJoining', this.doj.value);
      formData.append('salary', this.salary.value);
      formData.append('address', JSON.stringify(addressObj));
      if (this.isChanged) {
        formData.append('file', this.filetoUpload);
      }
      formData.append('isChanged', this.isChanged);
      this.issubmitted = true;
      this.manageStaff
        .updateProfile(this.userData.email, formData)
        .subscribe((res) => {
          this.toast.success('Edit Successfully', 'Success', {
            timeOut: 3000,
            closeButton: true,
          });
          this.loaddata();
        });
    } else {
      this.toast.info('Nothing to Change', 'Info', {
        timeOut: 3000,
        closeButton: true,
      });
    }
  }
  canExit() {
    if (this.updateProfileForm.dirty && !this.issubmitted) {
      return confirm('You have unsaved Changes.Do you want to navigate away?');
    } else {
      return true;
    }
  }
}
