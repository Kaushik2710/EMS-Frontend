package com.ems.Controller;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ems.Service.IRegisterService;
import com.ems.model.Address;
import com.ems.model.EmployeeSalaryDataDTO;
import com.ems.model.Employeeedit;
import com.ems.model.Experience;
import com.ems.model.LoginDTO;
import com.ems.model.LoginMessage;
import com.ems.model.Profileedit;
import com.ems.model.Register;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterController {

    private final ObjectMapper objectMapper;
    // private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RegisterController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Autowired
    private IRegisterService registerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public IRegisterService getRegisterService() {
        return registerService;
    }

    public void setRegisterService(IRegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping(path = "/registerUser")
    public ResponseEntity<?> addUser(@RequestParam("fname") String fname,
            @RequestParam("lname") String lname,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("gender") String gender,
            @RequestParam("department") String department,
            @RequestParam("dateOfBirth") LocalDate dateOfBirth,
            @RequestParam("dateOfJoining") LocalDate dateOfJoining,
            @RequestParam("password") String password,
            @RequestParam("cPassword") String cPassword,
            @RequestParam("salary") String salary,
            @RequestParam("skills") String[] skills,
            @RequestParam("street") String street,
            @RequestParam("postalcode") String postalcode,
            @RequestParam("region") String region,
            @RequestParam("city") String city,
            @RequestParam("country") String country,
            @RequestParam("experience") String experience,
            @RequestParam("skillstemp") String skillstemp,
            @RequestParam("addresstemp") String addresstemp,
            @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {

        Register reg1 = registerService.getUserByEmail(email);
        if (reg1 == null) {

            List<Experience> arrayOfObjects = objectMapper.readValue(experience, new TypeReference<List<Experience>>() {
            });
            // for (Experience obj : arrayOfObjects) {
            // Experience exp = new Experience(obj.getCompany(), obj.getPosition(),
            // obj.getTotalExp(), obj.getStart(),
            // obj.getEnd_date());

            // }
            Register reg = new Register();
            reg.setFname(fname);
            reg.setLname(lname);
            reg.setEmail(email);
            reg.setGender(gender);
            reg.setDepartment(department);
            reg.setDateOfJoining(dateOfJoining);
            reg.setDateOfBirth(dateOfBirth);
            reg.setPassword(passwordEncoder.encode(password));
            reg.setcPassword(passwordEncoder.encode(cPassword));
            reg.setSkills(skills);
            reg.setPhone(phone);
            reg.setSalary(Float.parseFloat(salary));
            reg.setUserRole("employee");
            reg.setIsactive(false);
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            if (filename.contains("..")) {
                System.out.println("Invalid file");
            }
            try {
                reg.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
            } catch (Exception e) {
                e.printStackTrace();
            }
            Address adr = new Address(street, postalcode, region, city, country);
            reg.setAddress(adr);
            reg.setExperience(arrayOfObjects);

            registerService.addUser(reg);
            return ResponseEntity.ok(reg);
        } else {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("User With This Email Already Exist");
        }
    }

    @PostMapping("/loginEmployee")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO) {
        LoginMessage lm = registerService.loginEmployee(loginDTO);
        return ResponseEntity.ok(lm);
    }

    @GetMapping(path = "/getUser/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Register reg = registerService.getUserByEmail(email);
        if (reg != null) {
            return ResponseEntity.ok(reg);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

    }

    @GetMapping("/getUserById/{id}")
    public @ResponseBody Register getUserById(@PathVariable Long id) {
        return registerService.getUser(id);
    }

    @PatchMapping(path = "/updateUser/{emailId}")
    public @ResponseBody Employeeedit updateUser(@PathVariable String emailId, @RequestParam("fname") String fname,
            @RequestParam("lname") String lname, @RequestParam("email") String email,
            @RequestParam("phone") String phone, @RequestParam("department") String department,
            @RequestParam("dateOfBirth") LocalDate dateOfBirth,
            @RequestParam("dateOfJoining") LocalDate dateOfJoining, @RequestParam("salary") String salary) {
        Employeeedit user = new Employeeedit();
        user.setFname(fname);
        user.setLname(lname);
        user.setEmail(email);
        user.setPhone(phone);
        user.setDepartment(department);
        user.setDateOfBirth(dateOfBirth);
        user.setDateOfJoining(dateOfJoining);
        user.setSalary(Float.parseFloat(salary));
        registerService.updateUser(emailId, user);
        return user;
    }

    @PatchMapping(path = "/updateProfile/{emailId}")
    public @ResponseBody Profileedit updateProfile(@PathVariable String emailId, @RequestParam("fname") String fname,
            @RequestParam("lname") String lname, @RequestParam("email") String email,
            @RequestParam("phone") String phone, @RequestParam("department") String department,
            @RequestParam("dateOfBirth") LocalDate dateOfBirth, @RequestParam("gender") String gender,

            @RequestParam("address") Address address,
            @RequestParam("dateOfJoining") LocalDate dateOfJoining, @RequestParam("salary") String salary,
            @RequestParam(required = false, value = "file") MultipartFile file,
            @RequestParam("isChanged") String isChanged) {
        Profileedit user = new Profileedit();
        user.setFname(fname);
        user.setLname(lname);
        user.setEmail(email);
        user.setGender(gender);
        user.setPhone(phone);
        user.setDepartment(department);
        user.setDateOfBirth(dateOfBirth);
        user.setDateOfJoining(dateOfJoining);

        user.setAddress(address);
        user.setSalary(Float.parseFloat(salary));
        user.setChanged(Boolean.parseBoolean(isChanged));
        if (file != null) {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            if (filename.contains("..")) {
                System.out.println("Invalid file");
            }
            try {
                user.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        registerService.updateProfile(emailId, user);
        return user;
    }

    @PatchMapping("/addSalary/{email}")
    public void addSalary(@PathVariable String email, @RequestParam("salary") String salary) {
        registerService.addSalary(email, Float.parseFloat(salary));
    }

    @DeleteMapping(path = "/deleteUser/{email}")
    public Long deleteUser(@PathVariable String email) {
        return registerService.deleteUserByEmail(email);
    }

    @GetMapping(path = "/getAllUser")
    public @ResponseBody Iterable<Register> getAllUser() {
        return registerService.getAllUser();
    }

    @GetMapping(path = "/getEmployeeSalaryData")
    public @ResponseBody List<EmployeeSalaryDataDTO> getEmployeeSalaryData() {
        return registerService.findEmployeeSalaryData();
    }

}
