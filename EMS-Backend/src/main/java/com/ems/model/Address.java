package com.ems.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    private String street;
    private String postalcode;
    private String region;
    private String city;
    private String country;

    public Address() {
    }

    public String getStreet() {
        return street;
    }

    public Address(String street, String postalcode, String region, String city,
            String country) {
        this.street = street;
        this.postalcode = postalcode;
        this.region = region;
        this.city = city;
        this.country = country;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

}
