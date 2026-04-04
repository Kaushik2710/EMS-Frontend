package com.ems.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.Repository.TodoRepo;
import com.ems.model.Todo;
import com.ems.model.TodoStatus;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoService implements ITodoService {
    @Autowired
    private TodoRepo todoRepo;

    public TodoRepo getTodoRepo() {
        return todoRepo;
    }

    public void setTodoRepo(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    @Override
    public Todo addTask(Todo todo) {
        Todo td = todoRepo.save(todo);
        return td;
    }

    @Override
    public List<Todo> getTaskByEmail(String email) {
        List<Todo> td = todoRepo.findByEmail(email);
        return td;
    }

    @Override
    public Todo getTaskById(Long id) {
        Todo td = todoRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        ;
        return td;
    }

    @Override
    public Todo updateTaskStatus(Long id, TodoStatus status) {
        Todo todo = todoRepo.findById(id).orElse(null);
        if (todo != null) {
            todo.setStatus(status);
            return todoRepo.save(todo);
        }
        return null;
    }

    @Override
    public void deleteTask(Long id) {
        todoRepo.deleteById(id);
    }

    @Override
    public Todo updateTaskDescription(Long id, String newDescription) {
        Todo todo = todoRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Todo with id " + id + " not found"));
        todo.setDescription(newDescription);
        return todoRepo.save(todo);
    }
}
