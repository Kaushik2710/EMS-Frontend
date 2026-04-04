package com.ems.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ems.model.EmployeeSalaryDataDTO;
import com.ems.model.Register;

import jakarta.transaction.Transactional;

@Repository
public interface RegisterRepo extends JpaRepository<Register, Long> {

    public Register findByEmail(String email);

    public Long deleteByEmail(String email);

    @Modifying
    @Transactional
    @Query("update Register reg set reg.password=:password,reg.cPassword=:password where reg.email=:email")
    public void updatePassword(String email, String password);

    public List<Register> findAllByIdNotIn(List<Long> employeeIds);

    @Query("select new com.ems.model.EmployeeSalaryDataDTO(r.id,r.fname,r.lname,r.email,r.salary,r.department,r.phone) from Register r")
    List<EmployeeSalaryDataDTO> findEmployeeSalaryData();

}
