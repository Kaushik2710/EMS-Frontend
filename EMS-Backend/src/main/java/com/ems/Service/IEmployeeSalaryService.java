package com.ems.Service;

import com.ems.model.EmployeeSalary;

public interface IEmployeeSalaryService {
    public void paySalary(Long id, float amount);

    public EmployeeSalary getEmployeeSalaryData(String email);
}
