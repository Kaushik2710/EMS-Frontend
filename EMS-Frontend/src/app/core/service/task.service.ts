import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  addTasks(data: any) {
    return this.http.post('http://localhost:8080/ems/addTask', data);
  }
  getTasks(email: any) {
    return this.http.get('http://localhost:8080/ems/getTask' + '/' + email);
  }
  updateTaskStatus(taskId: any, newStatus: string) {
    return this.http.put(
      'http://localhost:8080/ems/changeStatus' +
        '/' +
        taskId +
        '/status/' +
        newStatus,
      null
    );
  }
  deleteTask(id: any) {
    return this.http.delete('http://localhost:8080/ems/deleteTask' + '/' + id);
  }
  updateTask(id: any, description: any) {
    return this.http.put(
      'http://localhost:8080/ems/updateTask' + '/' + id,
      description
    );
  }
}
