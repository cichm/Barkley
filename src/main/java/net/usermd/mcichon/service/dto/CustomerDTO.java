package net.usermd.mcichon.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Customer entity.
 */
public class CustomerDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 30)
    @Pattern(regexp = "[A-Z][a-z]*")
    private String firstName;

    @NotNull
    @Size(max = 30)
    @Pattern(regexp = "[A-Z][a-z]*")
    private String lastName;

    @NotNull
    @Size(max = 10)
    @Pattern(regexp = "[A-Z0-9]*")
    private String document;

    @NotNull
    @Size(max = 30)
    @Pattern(regexp = "[0-9]{11}")
    private String pesel;

    @Size(max = 12)
    @Pattern(regexp = "\\+[0-9]{11}")
    private String phoneNumber;

    @Size(max = 30)
    @Pattern(regexp = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]{1,})*\\.([a-zA-Z]{2,}){1}$")
    private String email;

    private Long aditionalInfoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getAditionalInfoId() {
        return aditionalInfoId;
    }

    public void setAditionalInfoId(Long customerAdditionalInfoId) {
        this.aditionalInfoId = customerAdditionalInfoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerDTO customerDTO = (CustomerDTO) o;
        if(customerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", document='" + getDocument() + "'" +
            ", pesel='" + getPesel() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
