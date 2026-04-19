import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ManageStaffService {
  constructor(private http: HttpClient) {}
  apiUser: string = environment.apiUrl + '/user';
  apiDept: string = environment.apiUrl + '/Department';
  apiLink: string = environment.apiUrl + '/social';
  getAllUsers() {
    return this.http.get(environment.apiUrl + '/getAllUser');
  }
  getUserById(id: any) {
    return this.http.get(environment.apiUrl + '/getUserById' + '/' + id);
  }
  deleteUser(email: string) {
    return this.http.delete(
      environment.apiUrl + '/deleteUser' + '/' + email
    );
  }
  editUser(email: string, formData: any) {
    return this.http.patch(
      environment.apiUrl + '/updateUser' + '/' + email,
      formData
    );
  }
  getUserSalaryData() {
    return this.http.get(environment.apiUrl + '/getEmployeeSalaryData');
  }
  updateProfile(email: string, formData: any) {
    return this.http.patch(
      environment.apiUrl + '/updateProfile' + '/' + email,
      formData
    );
  }
  addDepartment(dept: any) {
    return this.http.post(environment.apiUrl + '/addDepartment', dept);
  }
  getAllDepartment() {
    return this.http.get(environment.apiUrl + '/getAllDepartment');
  }
  deleteDepartment(id: any) {
    return this.http.delete(
      environment.apiUrl + '/deleteDepartment' + '/' + id
    );
  }
  sendEmail(formData: any) {
    return this.http.post(environment.apiUrl + '/sendEmail', formData);
  }
  editDepartment(id: string, data: any) {
    return this.http.patch(
      environment.apiUrl + '/editDepartment' + '/' + id,
      data
    );
  }
  addSalary(id: string, formData: any) {
    return this.http.patch(
      environment.apiUrl + '/addSalary' + '/' + id,
      formData
    );
  }
  addLinks(data: any) {
    return this.http.post(environment.apiUrl + '/addLinks', data);
  }
  getLinks(email: any) {
    return this.http.get(environment.apiUrl + '/getLinks' + '/' + email);
  }
  paySalary(id: any, amount: any) {
    return this.http.get(
      environment.apiUrl + '/paySalary' + '/' + id + '/' + amount
    );
  }
  getEmployeeSalaryData(email: any) {
    return this.http.get(
      environment.apiUrl + '/getEmployeeSalaryData' + '/' + email
    );
  }
}
