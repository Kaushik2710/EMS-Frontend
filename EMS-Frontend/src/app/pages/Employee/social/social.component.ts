import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css',
})
export class SocialComponent {
  linkService: ManageStaffService = inject(ManageStaffService);
  toast: ToastrService = inject(ToastrService);
  user!: any;
  linkForm = new FormGroup({
    github: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
  });
  addLinks() {
    this.linkService.addLinks(this.linkForm.value).subscribe((res) => {
      this.toast.success('Added Successfully', 'Links Added', {
        timeOut: 3000,
        closeButton: true,
      });
    });
    this.linkForm.reset();
  }
}
