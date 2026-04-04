package com.ems.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.Repository.RegisterRepo;
import com.ems.Repository.SocialRepo;
import com.ems.Repository.TodoRepo;
import com.ems.model.EmployeeSalaryDataDTO;
import com.ems.model.Employeeedit;
import com.ems.model.LoginDTO;
import com.ems.model.LoginMessage;
import com.ems.model.Profileedit;
import com.ems.model.Register;
import com.ems.model.Social;
import com.ems.model.Todo;

@Service
public class RegisterService implements IRegisterService {
    @Autowired
    private RegisterRepo registerRepo;
    @Autowired
    private SocialRepo socialRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TodoRepo todoRepo;

    public TodoRepo getTodoRepo() {
        return todoRepo;
    }

    public void setTodoRepo(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    public RegisterRepo getRegisterRepo() {
        return registerRepo;
    }

    public void setRegisterRepo(RegisterRepo registerRepo) {
        this.registerRepo = registerRepo;
    }

    public SocialRepo getSocialRepo() {
        return socialRepo;
    }

    public void setSocialRepo(SocialRepo socialRepo) {
        this.socialRepo = socialRepo;
    }

    @Override
    public Register addUser(Register register) {
        Register savedUser = registerRepo.save(register);
        return savedUser;
    }

    @Override
    public Register getUser(Long id) {
        java.util.Optional<Register> registerOptinal = registerRepo.findById(id);
        return registerOptinal.orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Register getUserByEmail(String email) {
        Register registerOptinal = registerRepo.findByEmail(email);
        return registerOptinal;
    }

    @Override
    @Transactional
    @Modifying
    public Long deleteUserByEmail(String email) {
        return registerRepo.deleteByEmail(email);
    }

    @Override
    @Transactional
    @Modifying
    public Register updateUser(String emailId, Employeeedit user) {
        Register reg = registerRepo.findByEmail(emailId);
        if (emailId != user.getEmail() && reg != null) {
            Social s = socialRepo.findByEmail(emailId);
            List<Todo> td = todoRepo.findByEmail(emailId);
            if (s != null) {
                s.setEmail(user.getEmail());
                socialRepo.save(s);
            }
            if (td != null) {
                todoRepo.updateEmail(emailId, user.getEmail());
            }
        }

        if (reg == null) {
            throw new RuntimeException("Error");
        }
        reg.setFname(user.getFname());
        reg.setLname(user.getLname());
        reg.setPhone(user.getPhone());
        reg.setEmail(user.getEmail());
        reg.setDepartment(user.getDepartment());
        reg.setDateOfJoining(user.getDateOfJoining());
        reg.setDateOfBirth(user.getDateOfBirth());
        reg.setSalary(user.getSalary());

        return registerRepo.save(reg);
    }

    @Override
    @Transactional
    @Modifying
    public Register updateProfile(String emailId, Profileedit profile) {
        Register reg = registerRepo.findByEmail(emailId);
        if (emailId != profile.getEmail() && reg != null) {
            Social s = socialRepo.findByEmail(emailId);
            List<Todo> td = todoRepo.findByEmail(emailId);

            if (s != null) {
                s.setEmail(profile.getEmail());
                socialRepo.save(s);
            }
            if (td != null) {
                todoRepo.updateEmail(emailId, profile.getEmail());
            }
        }
        if (reg == null) {
            throw new RuntimeException("Error");
        }
        reg.setFname(profile.getFname());
        reg.setLname(profile.getLname());
        reg.setPhone(profile.getPhone());
        reg.setEmail(profile.getEmail());
        reg.setDepartment(profile.getDepartment());
        reg.setDateOfJoining(profile.getDateOfJoining());
        reg.setDateOfBirth(profile.getDateOfBirth());
        reg.setSalary(profile.getSalary());
        reg.setGender(profile.getGender());
        reg.setAddress(profile.getAddress());
        if (profile.isChanged()) {
            reg.setImage(profile.getImage());
        }
        return registerRepo.save(reg);
    }

    @Override
    @Transactional
    @Modifying
    public Register addSalary(String email, Float salary) {
        Register reg = registerRepo.findByEmail(email);
        if (reg == null) {
            throw new RuntimeException("Error");
        }
        reg.setSalary(salary);
        return registerRepo.save(reg);
    }

    @Override
    public Iterable<Register> getAllUser() {
        Iterable<Register> reg = registerRepo.findAll();
        return reg;
    }

    @Override
    @Transactional
    public LoginMessage loginEmployee(LoginDTO loginDTO) {
        Register reg = registerRepo.findByEmail(loginDTO.getEmail());
        if (reg != null) {
            boolean isactive = reg.isIsactive();
            String password = loginDTO.getPassword();
            String encodedPassword = reg.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (isMatched) {
                return new LoginMessage(isactive, true, "Success", reg.getEmail(), reg.getUserRole(), reg.getFname());
            } else {
                return new LoginMessage(isactive, false, "Not Match", "", "", "");
            }
        } else {
            return new LoginMessage(false, false, "Not Exist", "", "", "");
        }
    }

    @Override
    public List<EmployeeSalaryDataDTO> findEmployeeSalaryData() {
        return registerRepo.findEmployeeSalaryData();
    }
}
