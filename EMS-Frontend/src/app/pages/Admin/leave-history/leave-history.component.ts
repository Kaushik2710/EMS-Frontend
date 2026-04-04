import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leave-history',
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
    MatChipsModule,
    DatePipe,
  ],
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.css',
})
export class LeaveHistoryComponent implements OnInit {
  sanitizer: DomSanitizer = inject(DomSanitizer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  leaveData!: any;
  leaveService: LeaveService = inject(LeaveService);
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.leaveService.getAllLeave().subscribe((res) => {
      this.leaveData = res;
      this.dataSource = new MatTableDataSource(this.leaveData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.leaveData.map((item: any, index: any) => ({
        ...item,
        id: this.calculateId(index),
      }));
      this.dataSource.sort = this.sort;
    });
  }
  calculateId(index: number): number {
    const pageIndex = this.paginator.pageIndex || 0;
    const pageSize = this.paginator.pageSize || 5;
    const startingIndex = pageIndex * pageSize;
    return startingIndex + index + 1;
  }
  dataSource: any;
  displayColumns: string[] = [
    'no',
    'photo',
    'name',
    'email',
    'department',
    'reason',
    'description',
    'leaveFromDate',
    'leaveToDate',
    'status',
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
}
