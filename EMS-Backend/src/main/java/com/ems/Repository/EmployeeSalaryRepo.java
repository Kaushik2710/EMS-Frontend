package com.ems.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.model.EmployeeSalary;

@Repository
public interface EmployeeSalaryRepo extends JpaRepository<EmployeeSalary, Long> {

    Optional<EmployeeSalary> findByRegisterEmail(String email);
}
