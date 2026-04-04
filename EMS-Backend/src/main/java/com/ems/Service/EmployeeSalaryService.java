package com.ems.Service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.Repository.EmployeeSalaryRepo;
import com.ems.Repository.RegisterRepo;
import com.ems.model.EmployeeSalary;
import com.ems.model.Register;

import jakarta.transaction.Transactional;

@Service
public class EmployeeSalaryService implements IEmployeeSalaryService {
    @Autowired
    private EmployeeSalaryRepo employeeSalaryRepo;
    @Autowired
    private RegisterRepo registerRepo;

    @Override
    public void paySalary(Long id, float amount) {
        Optional<Register> reg = registerRepo.findById(id);
        if (reg.isPresent()) {
            Register reg1 = reg.get();
            EmployeeSalary employeeSalary = new EmployeeSalary();
            employeeSalary.setRegister(reg1);
            employeeSalary.setAmount(amount);
            employeeSalary.setPaid(true);
            employeeSalary.setPaymentDate(new Date());
            employeeSalaryRepo.save(employeeSalary);
        }

    }

    @Override
    @Transactional
    public EmployeeSalary getEmployeeSalaryData(String email) {

        Optional<EmployeeSalary> empSal = employeeSalaryRepo.findByRegisterEmail(email);
        if (empSal.isPresent()) {
            return empSal.get();
        } else {
            throw new RuntimeException("Error");
        }
    }
}
