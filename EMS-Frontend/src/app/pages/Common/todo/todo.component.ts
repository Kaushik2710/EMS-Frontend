import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../../core/service/task.service';
interface Todo {
  id?: number;
  email: string;
  description: string;
  status: string;
}
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  todoForm!: FormGroup;
  tasks: Todo[] = [];
  inProgress: Todo[] = [];
  done: Todo[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;
  userEmail: any;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('id');
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
    this.getTasks();
  }
  getTasks(): void {
    this.tasks = [];
    this.inProgress = [];
    this.done = [];
    this.taskService.getTasks(this.userEmail).subscribe((response: any) => {
      response.forEach((todo: any) => {
        if (todo.status === 'TASKS') {
          this.tasks.push(todo);
        } else if (todo.status === 'IN_PROGRESS') {
          this.inProgress.push(todo);
        } else if (todo.status === 'DONE') {
          this.done.push(todo);
        }
      });
    });
  }

  addTask(): void {
    const newTodo: Todo = {
      email: this.userEmail,
      description: this.todoForm.value.item,
      status: 'TASKS',
    };
    this.taskService.addTasks(newTodo).subscribe((response: any) => {
      this.tasks.push(response);
      this.todoForm.reset();
    });
  }
  deleteTask(i: any) {
    this.taskService.deleteTask(i).subscribe((res) => {
      this.getTasks();
    });
  }
  onEdit(item: any) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = item.id;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.taskService
      .updateTask(this.updateIndex, this.todoForm.value.item)
      .subscribe((res) => {
        this.getTasks();
      });
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      const newStatus = event.container.id;
      this.taskService
        .updateTaskStatus(taskId, newStatus)
        .subscribe((response) => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        });
    }
  }
}
