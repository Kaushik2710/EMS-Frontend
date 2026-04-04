package com.ems.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String company;
    private String position;
    private Float totalExp;
    private LocalDate start;
    private LocalDate endDate;

    public Experience() {
    }

    public Experience(String company, String position, Float totalExp, LocalDate start, LocalDate endDate) {
        this.company = company;
        this.position = position;
        this.totalExp = totalExp;
        this.start = start;
        this.endDate = endDate;
    }

    public Experience(long id, String company, String position, Float totalExp, LocalDate start, LocalDate endDate) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.totalExp = totalExp;
        this.start = start;
        this.endDate = endDate;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Float getTotalExp() {
        return totalExp;
    }

    public void setTotalExp(Float totalExp) {
        this.totalExp = totalExp;
    }

    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

}
