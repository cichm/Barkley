package net.usermd.mcichon.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CustomerAdditionalInfo entity.
 */
public class CustomerAdditionalInfoDTO implements Serializable {

    private Long id;

    private Instant birthdate;

    @Size(max = 30)
    @Pattern(regexp = "[\"ul\"].[\" \"][A-Z][a-z]")
    private String street;

    @Size(max = 10)
    @Pattern(regexp = "[1-9][0-9]*\\#?[0-9]*")
    private String housenum;

    @Size(max = 6)
    @Pattern(regexp = "[0-9]{2}\\-[0-9]{3}")
    private String postalCode;

    @Size(max = 30)
    @Pattern(regexp = "[A-Z][a-z]*")
    private String city;

    @NotNull
    private Boolean isActive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Instant birthdate) {
        this.birthdate = birthdate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHousenum() {
        return housenum;
    }

    public void setHousenum(String housenum) {
        this.housenum = housenum;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = (CustomerAdditionalInfoDTO) o;
        if(customerAdditionalInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerAdditionalInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerAdditionalInfoDTO{" +
            "id=" + getId() +
            ", birthdate='" + getBirthdate() + "'" +
            ", street='" + getStreet() + "'" +
            ", housenum='" + getHousenum() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
