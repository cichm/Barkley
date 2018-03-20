package net.usermd.mcichon.domain;

import net.usermd.mcichon.config.Constants;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;

@Entity
@Table(name = "jhi_customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer extends AbstractAuditingEntity implements Serializable{

   private static final long serialVersianCID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @NotNull
    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;



    @Email
    @Size(min = 5, max = 100)
    @Column(length = 100, unique = true)
    private String email;

    @NotNull
    @Size(max = 9)
    @Column(name = "document", length = 9)
    private String document;

    @NotNull
    @Size(min = 11, max = 11)
    private String PESEL;

    @DateTimeFormat
    @Size(min=8, max=8)
    @Column(name = "birth_date", length = 8)
    private Date birthDate;

    @Size(max = 50)
    @Column(name = "address", length = 50)
    private String address;

    @Size(min = 6, max = 6)
    @Column(name = "postal_code", length = 50)
    private String postalCode;

    @Size(max = 50)
    @Column(name = "city", length = 50)
    private String city;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getPESEL() {
        return PESEL;
    }

    public void setPESEL(String PESEL) {
        this.PESEL = PESEL;
    }

    public Date getBirthDate() {
        return birthDate;
    }


    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer)) return false;

        Customer customer = (Customer) o;

        return id.equals(customer.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + id +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", document='" + document + '\'' +
            ", PESEL='" + PESEL + '\'' +
            ", birthDate=" + birthDate +
            ", address='" + address + '\'' +
            ", postalCode='" + postalCode + '\'' +
            ", city='" + city + '\'' +
            '}';
    }
}
