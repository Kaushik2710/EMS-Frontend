package com.ems;

import org.springframework.core.convert.converter.Converter;

import com.ems.model.Address;

public class StringToAddressConverter implements Converter<String, Address> {
    @Override
    public Address convert(String source) {
        String[] parts = source.split(",");

        Address address = new Address();
        String[] street = parts[0].split(":");
        String[] postalcode = parts[1].split(":");
        String[] region = parts[2].split(":");
        String[] city = parts[3].split(":");
        String[] country = parts[4].split(":");
        address.setStreet(street[1].replaceAll("\"", ""));
        address.setPostalcode(postalcode[1].replaceAll("\"", ""));
        address.setRegion(region[1].replaceAll("\"", ""));
        address.setCity(city[1].replaceAll("\"", ""));
        address.setCountry(country[1].replaceAll("\"", "").replaceAll("}", ""));

        return address;
    }
}
