import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeaveService } from '../../../core/service/leave.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
@Component({
  selector: 'app-manage-leave',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatCheckboxModule,
    DatePipe,
  ],
  templateUrl: './manage-leave.component.html',
  styleUrl: './manage-leave.component.css',
})
export class ManageLeaveComponent implements OnInit {
  leaveService: LeaveService = inject(LeaveService);
  sanitizer: DomSanitizer = inject(DomSanitizer);
  toast: ToastrService = inject(ToastrService);
  mailService: ManageStaffService = inject(ManageStaffService);
  leaveData!: any;
  body!: any;
  ngOnInit(): void {
    this.loadData();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  loadData() {
    this.leaveService.getPendingLeaveRequests().subscribe((res) => {
      this.leaveData = res;
      this.dataSource = new MatTableDataSource(this.leaveData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.leaveData.map((item: any, index: any) => ({
        ...item,
        id: this.calculateId(index),
      }));
      this.dataSource.sort = this.sort;
      // console.log(this.leaveData);
    });
  }
  calculateId(index: number): number {
    const pageIndex = this.paginator.pageIndex || 0;
    const pageSize = this.paginator.pageSize || 5;
    const startingIndex = pageIndex * pageSize;
    return startingIndex + index + 1;
  }
  displayColumns: string[] = [
    'no',
    'image',
    'name',
    'email',
    'department',
    'reason',
    'description',
    'from',
    'to',
    'action',
  ];
  getImageUrl(element: any): SafeUrl {
    if (element) {
      // Extracting image type from base64 string
      const typeMatch = element.register.image.match(
        /^data:(image\/[a-z]+);base64,/i
      );

      if (typeMatch && typeMatch.length > 1) {
        const imageType = typeMatch[1];
        return this.sanitizer.bypassSecurityTrustUrl(
          'data:' + imageType + ';base64,' + element.register.image
        );
      } else {
        return this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + element.register.image
        );
      }
    }
    return ''; // Or provide a placeholder image
  }
  filterChange(data: any) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  // truncateText(text: string) {
  //   if (text.length <= 15) {
  //     return text;
  //   } else {
  //     return text.substring(0, 15) + '...';
  //   }
  // }
  approveLeave(element: any) {
    this.leaveService.approveLeaveRequest(element.id).subscribe((res) => {
      this.loadData();
      this.sendMail(
        'Approved',
        element.register.email,
        element.leaveFromDate,
        element.leaveToDate
      );
      this.toast.info('Leave Approved For ' + element.register.fname, 'Info', {
        timeOut: 3000,
        closeButton: true,
      });
    });
  }
  rejectLeave(element: any) {
    this.leaveService.rejectLeaveRequest(element.id).subscribe((res) => {
      this.loadData();
      this.sendMail(
        'Rejected',
        element.register.email,
        element.leaveFromDate,
        element.leaveToDate
      );
      this.toast.info('Leave Rejected For ' + element.register.fname, 'Info', {
        timeOut: 3000,
        closeButton: true,
      });
    });
  }
  sendMail(status: any, to: any, leaveFromDate: any, leaveToDate: any) {
    const formData = new FormData();

    formData.append('to', to);
    formData.append('subject', 'Status Of Leave Request');
    if (status === 'Approved') {
      this.body =
        'Your Leave Request is Approved from Date: ' +
        leaveFromDate +
        ' To: ' +
        leaveToDate;
    } else {
      this.body =
        'Your Leave Request is Rejected from Date: ' +
        leaveFromDate +
        ' To: ' +
        leaveToDate;
    }
    formData.append('body', this.body);
    this.mailService.sendEmail(formData).subscribe((res) => {
      console.log(res);
    });
  }
}
