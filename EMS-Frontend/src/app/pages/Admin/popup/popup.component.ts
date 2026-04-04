import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, CurrencyPipe, NgClass } from '@angular/common';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SendEmailComponent } from '../send-email/send-email.component';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    DatePipe,
    CurrencyPipe,
    MatTooltipModule,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  linkService: ManageStaffService = inject(ManageStaffService);
  sanitizer: DomSanitizer = inject(DomSanitizer);
  linkData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private dialog: MatDialog
  ) {}
  userData: any;
  ngOnInit(): void {
    this.userData = this.data;
    this.linkService.getLinks(this.userData.data.email).subscribe({
      next: (res) => {
        this.linkData = res;
      },
      error: (err) => {
        this.linkData = null;
      },
    });
  }
  sendEmail() {
    this.ref.close();
    const _sendEmail = this.dialog.open(SendEmailComponent, {
      width: '50%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
    });
  }
  // closePopup() {
  //   this.ref.close();
  // }
  getImageUrl(): SafeUrl {
    if (this.userData) {
      // Extracting image type from base64 string
      const typeMatch = this.userData.data.image.match(
        /^data:(image\/[a-z]+);base64,/i
      );

      if (typeMatch && typeMatch.length > 1) {
        const imageType = typeMatch[1];
        return this.sanitizer.bypassSecurityTrustUrl(
          'data:' + imageType + ';base64,' + this.userData.data.image
        );
      } else {
        return this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + this.userData.data.image
        );
      }
    }
    return ''; // Or provide a placeholder image
  }
  downloadProfile() {
    const el: any = document.getElementById('profile');
    const elementsToHide = el.querySelectorAll('.exclude');
    elementsToHide.forEach((ele: any) => {
      ele.style.display = 'none';
    });

    html2canvas(el).then((canvas) => {
      const contentDataUrl = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataUrl, 'PNG', 0, 65, width, height);

      const filename = this.userData.data.fname + '.pdf';
      pdf.save(filename);
      elementsToHide.forEach((ele: any) => {
        ele.style.display = '';
      });
    });
  }
}
