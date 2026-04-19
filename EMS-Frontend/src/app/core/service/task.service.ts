import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  addTasks(data: any) {
    return this.http.post(environment.apiUrl + '/addTask', data);
  }
  getTasks(email: any) {
    return this.http.get(environment.apiUrl + '/getTask' + '/' + email);
  }
  updateTaskStatus(taskId: any, newStatus: string) {
    return this.http.put(
      environment.apiUrl + '/changeStatus' +
        '/' +
        taskId +
        '/status/' +
        newStatus,
      null
    );
  }
  deleteTask(id: any) {
    return this.http.delete(environment.apiUrl + '/deleteTask' + '/' + id);
  }
  updateTask(id: any, description: any) {
    return this.http.put(
      environment.apiUrl + '/updateTask' + '/' + id,
      description
    );
  }
}
