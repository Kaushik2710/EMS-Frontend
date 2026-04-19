import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}
  submitLeaveRequest(leaveRequest: any) {
    return this.http.post<any>(
      environment.apiUrl + '/leaveRequest',
      leaveRequest
    );
  }

  getPendingLeaveRequests() {
    return this.http.get<any[]>(environment.apiUrl + '/pendingLeaves');
  }

  approveLeaveRequest(requestId: any) {
    return this.http.post<any>(
      environment.apiUrl + '/approveLeave' + '/' + requestId,
      {}
    );
  }
  rejectLeaveRequest(requestId: any) {
    return this.http.post<any>(
      environment.apiUrl + '/rejectLeave' + '/' + requestId,
      {}
    );
  }
  getAllLeave() {
    return this.http.get<any[]>(environment.apiUrl + '/getAllLeave');
  }
  noOfLeaveRequest() {
    return this.http.get(environment.apiUrl + '/noOfLeaveRequest');
  }
  findByRegisterEmail(email: any) {
    return this.http.get(
      environment.apiUrl + '/getUserLeaveData' + '/' + email
    );
  }
  getLeaveRequestsOfEmployee(email: any) {
    return this.http.get(
      environment.apiUrl + '/getLeaveRequestsOfEmployee' + '/' + email
    );
  }
}
