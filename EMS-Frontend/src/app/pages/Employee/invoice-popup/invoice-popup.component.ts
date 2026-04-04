import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-popup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DatePipe, CurrencyPipe, MatIcon],
  templateUrl: './invoice-popup.component.html',
  styleUrl: './invoice-popup.component.css',
})
export class InvoicePopupComponent implements OnInit {
  userData: any;
  invoiceDate: any;
  userName: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<InvoicePopupComponent>,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.userData = this.data;
    this.userName = this.userData.data.register.fname;
    this.invoiceDate = new Date();
  }
  // printInvoice() {
  //   window.print();
  // }
  downloadInvoice() {
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
      pdf.addImage(contentDataUrl, 'PNG', 0, 30, width, height);

      const filename = this.userName + '.pdf';
      pdf.save(filename);
      elementsToHide.forEach((ele: any) => {
        ele.style.display = '';
      });
    });
  }
}
