package com.ems.Service;

import java.util.List;

import com.ems.model.EmployeeSalaryDataDTO;
import com.ems.model.Employeeedit;
import com.ems.model.LoginDTO;
import com.ems.model.LoginMessage;
import com.ems.model.Profileedit;
import com.ems.model.Register;

public interface IRegisterService {
    public Register addUser(Register register);

    public Register getUser(Long id);

    public Register getUserByEmail(String email);

    public Long deleteUserByEmail(String email);

    public Register updateUser(String emailId, Employeeedit user);

    public Iterable<Register> getAllUser();

    public Register addSalary(String email, Float salary);

    public Register updateProfile(String emailId, Profileedit profile);

    public LoginMessage loginEmployee(LoginDTO loginDTO);

    public List<EmployeeSalaryDataDTO> findEmployeeSalaryData();
}
