import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}
  submitLeaveRequest(leaveRequest: any) {
    return this.http.post<any>(
      'http://localhost:8080/ems/leaveRequest',
      leaveRequest
    );
  }

  getPendingLeaveRequests() {
    return this.http.get<any[]>('http://localhost:8080/ems/pendingLeaves');
  }

  approveLeaveRequest(requestId: any) {
    return this.http.post<any>(
      'http://localhost:8080/ems/approveLeave' + '/' + requestId,
      {}
    );
  }
  rejectLeaveRequest(requestId: any) {
    return this.http.post<any>(
      'http://localhost:8080/ems/rejectLeave' + '/' + requestId,
      {}
    );
  }
  getAllLeave() {
    return this.http.get<any[]>('http://localhost:8080/ems/getAllLeave');
  }
  noOfLeaveRequest() {
    return this.http.get('http://localhost:8080/ems/noOfLeaveRequest');
  }
  findByRegisterEmail(email: any) {
    return this.http.get(
      'http://localhost:8080/ems/getUserLeaveData' + '/' + email
    );
  }
  getLeaveRequestsOfEmployee(email: any) {
    return this.http.get(
      'http://localhost:8080/ems/getLeaveRequestsOfEmployee' + '/' + email
    );
  }
}
