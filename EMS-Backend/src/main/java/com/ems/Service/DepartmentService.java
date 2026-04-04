package com.ems.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.Repository.DepartmentRepo;
import com.ems.model.Department;

@Service
public class DepartmentService implements IDepartmentService {

    @Autowired
    private DepartmentRepo departmentRepo;

    public DepartmentRepo getDepartmentRepo() {
        return departmentRepo;
    }

    public void setDepartmentRepo(DepartmentRepo departmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    @Override
    public Department addDepartment(Department department) {
        Department addDept = departmentRepo.save(department);
        return addDept;
    }

    @Override
    public Iterable<Department> getAllDepartment() {
        Iterable<Department> dept = departmentRepo.findAll();
        return dept;
    }

    @Override
    public void deleteDepartment(Long id) {
        departmentRepo.deleteById(id);
    }

    @Override
    public Department editDepartment(Long id, Department dept) {
        Department depart = departmentRepo.findById(id).orElse(null);
        if (depart == null) {
            throw new RuntimeException("Error");
        }
        depart.setDepartmentName(dept.getDepartmentName());
        return departmentRepo.save(depart);

    }
}
