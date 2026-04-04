package com.ems.Service;

import com.ems.model.Department;

public interface IDepartmentService {
    public Department addDepartment(Department department);

    public Iterable<Department> getAllDepartment();

    public void deleteDepartment(Long id);

    public Department editDepartment(Long id, Department dept);
}
