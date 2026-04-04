import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageStaffService {
  constructor(private http: HttpClient) {}
  apiUser: string = 'http://localhost:3000/user';
  apiDept: string = 'http://localhost:3000/Department';
  apiLink: string = 'http://localhost:3000/social';
  getAllUsers() {
    return this.http.get('http://localhost:8080/ems/getAllUser');
  }
  getUserById(id: any) {
    return this.http.get('http://localhost:8080/ems/getUserById' + '/' + id);
  }
  deleteUser(email: string) {
    return this.http.delete(
      'http://localhost:8080/ems/deleteUser' + '/' + email
    );
  }
  editUser(email: string, formData: any) {
    return this.http.patch(
      'http://localhost:8080/ems/updateUser' + '/' + email,
      formData
    );
  }
  getUserSalaryData() {
    return this.http.get('http://localhost:8080/ems/getEmployeeSalaryData');
  }
  updateProfile(email: string, formData: any) {
    return this.http.patch(
      'http://localhost:8080/ems/updateProfile' + '/' + email,
      formData
    );
  }
  addDepartment(dept: any) {
    return this.http.post('http://localhost:8080/ems/addDepartment', dept);
  }
  getAllDepartment() {
    return this.http.get('http://localhost:8080/ems/getAllDepartment');
  }
  deleteDepartment(id: any) {
    return this.http.delete(
      'http://localhost:8080/ems/deleteDepartment' + '/' + id
    );
  }
  sendEmail(formData: any) {
    return this.http.post('http://localhost:8080/ems/sendEmail', formData);
  }
  editDepartment(id: string, data: any) {
    return this.http.patch(
      'http://localhost:8080/ems/editDepartment' + '/' + id,
      data
    );
  }
  addSalary(id: string, formData: any) {
    return this.http.patch(
      'http://localhost:8080/ems/addSalary' + '/' + id,
      formData
    );
  }
  addLinks(data: any) {
    return this.http.post('http://localhost:8080/ems/addLinks', data);
  }
  getLinks(email: any) {
    return this.http.get('http://localhost:8080/ems/getLinks' + '/' + email);
  }
  paySalary(id: any, amount: any) {
    return this.http.get(
      'http://localhost:8080/ems/paySalary' + '/' + id + '/' + amount
    );
  }
  getEmployeeSalaryData(email: any) {
    return this.http.get(
      'http://localhost:8080/ems/getEmployeeSalaryData' + '/' + email
    );
  }
}
