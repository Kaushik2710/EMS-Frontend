package com.ems.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.Service.IEmployeeSalaryService;
import com.ems.model.EmployeeSalary;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeSalaryController {
    @Autowired
    private IEmployeeSalaryService employeeSalaryService;

    @GetMapping("/paySalary/{id}/{amount}")
    public ResponseEntity<?> paySalary(@PathVariable Long id, @PathVariable String amount) {
        employeeSalaryService.paySalary(id, Float.parseFloat(amount));
        return ResponseEntity.ok(null);
    }

    public IEmployeeSalaryService getEmployeeSalaryService() {
        return employeeSalaryService;
    }

    public void setEmployeeSalaryService(IEmployeeSalaryService employeeSalaryService) {
        this.employeeSalaryService = employeeSalaryService;
    }

    @GetMapping("/getEmployeeSalaryData/{email}")
    public ResponseEntity<?> getEmployeeSalaryData(@PathVariable String email) {
        EmployeeSalary empSal = employeeSalaryService.getEmployeeSalaryData(email);
        return ResponseEntity.ok(empSal);
    }
}
