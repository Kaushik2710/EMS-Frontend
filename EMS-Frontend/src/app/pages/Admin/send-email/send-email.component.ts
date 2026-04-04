import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css',
})
export class SendEmailComponent {
  manageStaff: ManageStaffService = inject(ManageStaffService);
  toast: ToastrService = inject(ToastrService);
  sendEmailForm = new FormGroup({
    to: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
    cc: new FormArray([
      new FormControl(
        null,
        Validators.pattern(
          '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
        )
      ),
    ]),
    bcc: new FormArray([
      new FormControl(
        null,
        Validators.pattern(
          '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
        )
      ),
    ]),
    subject: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    file: new FormControl(''),
  });
  get to(): FormControl {
    return this.sendEmailForm.get('to') as FormControl;
  }
  get cc(): FormArray {
    return this.sendEmailForm.get('cc') as FormArray;
  }
  get bcc(): FormArray {
    return this.sendEmailForm.get('bcc') as FormArray;
  }
  get subject(): FormControl {
    return this.sendEmailForm.get('subject') as FormControl;
  }
  get body(): FormControl {
    return this.sendEmailForm.get('body') as FormControl;
  }
  get file(): FormControl {
    return this.sendEmailForm.get('file') as FormControl;
  }

  AddCc() {
    (<FormArray>this.sendEmailForm.get('cc')).push(
      new FormControl(null, Validators.required)
    );
  }
  DeleteCc(index: number) {
    const controls = <FormArray>this.sendEmailForm.get('cc');
    controls.removeAt(index);
  }
  AddBcc() {
    (<FormArray>this.sendEmailForm.get('bcc')).push(
      new FormControl(null, Validators.required)
    );
  }
  DeleteBcc(index: number) {
    const controls = <FormArray>this.sendEmailForm.get('bcc');
    controls.removeAt(index);
  }
  files!: FileList;
  onFileSelected(event: any) {
    this.files = event.target.files;
  }
  sendEmail() {
    const formData = new FormData();
    if (this.files != null) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
    }
    formData.append('to', this.to.value);
    if (this.cc.value.length > 0) {
      formData.append('cc', this.cc.value);
    }
    if (
      this.bcc.value != null ||
      this.bcc.value != '' ||
      this.bcc.value != undefined
    ) {
      formData.append('bcc', this.bcc.value);
    }
    formData.append('subject', this.subject.value);
    formData.append('body', this.body.value);
    this.manageStaff.sendEmail(formData).subscribe((res: any) => {
      // console.log(res);
      this.toast.success('Sent Successfully', 'Success', {
        timeOut: 3000,
        closeButton: true,
      });
    });
    // console.log(this.sendEmailForm.value);
    // console.log(this.files);
    // this.sendEmailForm.reset();
  }
}
