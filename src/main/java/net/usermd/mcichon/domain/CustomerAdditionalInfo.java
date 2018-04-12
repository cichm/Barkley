package net.usermd.mcichon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A CustomerAdditionalInfo.
 */
@Entity
@Table(name = "customer_additional_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerAdditionalInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "birthdate")
    private Instant birthdate;

    @Size(max = 30)
    @Pattern(regexp = "[\"ul\"].[\" \"][A-Z][a-z]")
    @Column(name = "street", length = 30)
    private String street;

    @Size(max = 10)
    @Pattern(regexp = "[1-9][0-9]*\\/?[0-9]*")
    @Column(name = "housenum", length = 10)
    private String housenum;

    @Size(max = 6)
    @Pattern(regexp = "[0-9]{2}\\-[0-9]{3}")
    @Column(name = "postal_code", length = 6)
    private String postalCode;

    @Size(max = 30)
    @Pattern(regexp = "[A-Z][a-z]*")
    @Column(name = "city", length = 30)
    private String city;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getBirthdate() {
        return birthdate;
    }

    public CustomerAdditionalInfo birthdate(Instant birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(Instant birthdate) {
        this.birthdate = birthdate;
    }

    public String getStreet() {
        return street;
    }

    public CustomerAdditionalInfo street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHousenum() {
        return housenum;
    }

    public CustomerAdditionalInfo housenum(String housenum) {
        this.housenum = housenum;
        return this;
    }

    public void setHousenum(String housenum) {
        this.housenum = housenum;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public CustomerAdditionalInfo postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public CustomerAdditionalInfo city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public CustomerAdditionalInfo isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CustomerAdditionalInfo customerAdditionalInfo = (CustomerAdditionalInfo) o;
        if (customerAdditionalInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerAdditionalInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerAdditionalInfo{" +
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
