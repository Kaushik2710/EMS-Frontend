package com.ems.Service;

import java.util.List;

import com.ems.model.Todo;
import com.ems.model.TodoStatus;

public interface ITodoService {
    public Todo addTask(Todo todo);

    public List<Todo> getTaskByEmail(String email);

    public Todo getTaskById(Long id);

    public Todo updateTaskStatus(Long id, TodoStatus status);

    public void deleteTask(Long id);

    public Todo updateTaskDescription(Long id, String newDescription);
}
