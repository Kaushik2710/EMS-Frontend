import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
  FormArray,
} from '@angular/forms';

import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ManageStaffService } from '../../../core/service/manage-staff.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private toast: ToastrService) {}
  deptData: any;
  ngOnInit(): void {
    this.deptService.getAllDepartment().subscribe((res) => {
      this.deptData = res;
    });
  }
  authService: AuthService = inject(AuthService);
  deptService: ManageStaffService = inject(ManageStaffService);
  issubmitted: boolean = false;
  deptArray: string[] = [
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Data Analyst',
    'Finance',
    'Marketing',
    'HR',
  ];
  countryArray: string[] = ['India', 'USA', 'Canada', 'Germany'];

  signupForm = new FormGroup(
    {
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
      salary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5,}$'),
      ]),
      gender: new FormControl('male', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,}$/
        ),
      ]),
      cPassword: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India', Validators.required),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required),
      }),
      skills: new FormArray([new FormControl(null, Validators.required)]),
      experience: new FormArray([]),
    },
    { validators: this.passwordMatchValidator }
  );
  formGroup: any;
  get fname(): FormControl {
    return this.signupForm.get('fname') as FormControl;
  }
  get lname(): FormControl {
    return this.signupForm.get('lname') as FormControl;
  }
  get id(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.signupForm.get('phone') as FormControl;
  }
  get gender(): FormControl {
    return this.signupForm.get('gender') as FormControl;
  }
  get department(): FormControl {
    return this.signupForm.get('department') as FormControl;
  }
  get date(): FormControl {
    return this.signupForm.get('date') as FormControl;
  }
  get doj(): FormControl {
    return this.signupForm.get('doj') as FormControl;
  }
  get image(): FormControl {
    return this.signupForm.get('image') as FormControl;
  }
  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }
  get cPassword(): FormControl {
    return this.signupForm.get('cPassword') as FormControl;
  }
  get street(): FormControl {
    return this.signupForm.get('address.street') as FormControl;
  }
  get postal(): FormControl {
    return this.signupForm.get('address.postal') as FormControl;
  }
  get region(): FormControl {
    return this.signupForm.get('address.region') as FormControl;
  }
  get city(): FormControl {
    return this.signupForm.get('address.city') as FormControl;
  }
  get country(): FormControl {
    return this.signupForm.get('address.country') as FormControl;
  }
  get skills(): FormArray {
    return this.signupForm.get('skills') as FormArray;
  }
  get experience(): FormArray {
    return this.signupForm.get('experience') as FormArray;
  }
  get salary(): FormControl {
    return this.signupForm.get('salary') as FormControl;
  }

  AddSkills() {
    (<FormArray>this.signupForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }
  filetoUpload!: File;
  onChangeFileField(event: any) {
    this.filetoUpload = event.target.files[0];
  }
  DeleteSkill(index: number) {
    const controls = <FormArray>this.signupForm.get('skills');
    controls.removeAt(index);
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
  AddExperience() {
    const frmgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      endDate: new FormControl(null),
    });

    (<FormArray>this.signupForm.get('experience')).push(frmgroup);
  }

  DeleteExperience(index: number) {
    const frmArray = <FormArray>this.signupForm.get('experience');
    frmArray.removeAt(index);
  }

  submitSignupForm() {
    this.issubmitted = true;
    const addressObj: any = {
      street: this.street.value,
      postalcode: this.postal.value,
      region: this.region.value,
      city: this.city.value,
      country: this.country.value,
    };

    const formData = new FormData();
    formData.append('fname', this.fname.value);
    formData.append('lname', this.lname.value);
    formData.append('email', this.id.value);
    formData.append('phone', this.phone.value);
    formData.append('gender', this.gender.value);
    formData.append('department', this.department.value);
    formData.append('dateOfBirth', this.date.value);
    formData.append('dateOfJoining', this.doj.value);
    formData.append('password', this.password.value);
    formData.append('cPassword', this.cPassword.value);
    formData.append('salary', this.salary.value);
    // formData.append('userRole', 'employee');
    // formData.append('isactive', 'false');
    formData.append('skills', this.skills.value);
    formData.append('skillstemp', JSON.stringify(this.skills.value));
    formData.append('addresstemp', JSON.stringify(addressObj));
    Object.keys(addressObj).forEach((key) => {
      formData.append(key, addressObj[key]);
    });
    formData.append('experience', JSON.stringify(this.experience.value));
    formData.append('file', this.filetoUpload);

    this.authService.ProceedRegister(formData).subscribe({
      next: (res: any) => {
        this.toast.success('Registred Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
        this.router.navigate(['login']);
      },
      error: (error) => {
        if (error.status === 208) {
          this.toast.error('Already Exist', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        } else {
          this.toast.error('Error Occurred While Registering User', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
    });
  }
  canExit() {
    if (this.signupForm.dirty && !this.issubmitted) {
      return confirm('You have unsaved Changes.Do you want to navigate away?');
    } else {
      return true;
    }
  }
}
