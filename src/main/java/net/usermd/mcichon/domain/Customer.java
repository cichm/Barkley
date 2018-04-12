package net.usermd.mcichon.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    @Pattern(regexp = "[A-Z][a-z]*")
    @Column(name = "first_name", length = 30, nullable = false)
    private String firstName;

    @NotNull
    @Size(max = 30)
    @Pattern(regexp = "[A-Z][a-z]*")
    @Column(name = "last_name", length = 30, nullable = false)
    private String lastName;

    @NotNull
    @Size(max = 10)
    @Pattern(regexp = "[A-Z0-9]*")
    @Column(name = "document", length = 10, nullable = false)
    private String document;

    @NotNull
    @Size(max = 30)
    @Pattern(regexp = "[0-9]{11}")
    @Column(name = "pesel", length = 30, nullable = false)
    private String pesel;

    @Size(max = 12)
    @Pattern(regexp = "\\+[0-9]{11}")
    @Column(name = "phone_number", length = 12)
    private String phoneNumber;

    @Size(max = 30)
    @Pattern(regexp = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]{1,})*\\.([a-zA-Z]{2,}){1}$")
    @Column(name = "email", length = 30)
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private CustomerAdditionalInfo aditionalInfo;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MoneyAccount> accounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Customer firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Customer lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDocument() {
        return document;
    }

    public Customer document(String document) {
        this.document = document;
        return this;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getPesel() {
        return pesel;
    }

    public Customer pesel(String pesel) {
        this.pesel = pesel;
        return this;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Customer phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public CustomerAdditionalInfo getAditionalInfo() {
        return aditionalInfo;
    }

    public Customer aditionalInfo(CustomerAdditionalInfo customerAdditionalInfo) {
        this.aditionalInfo = customerAdditionalInfo;
        return this;
    }

    public void setAditionalInfo(CustomerAdditionalInfo customerAdditionalInfo) {
        this.aditionalInfo = customerAdditionalInfo;
    }

    public Set<MoneyAccount> getAccounts() {
        return accounts;
    }

    public Customer accounts(Set<MoneyAccount> moneyAccounts) {
        this.accounts = moneyAccounts;
        return this;
    }

    public Customer addAccount(MoneyAccount moneyAccount) {
        this.accounts.add(moneyAccount);
        moneyAccount.setCustomer(this);
        return this;
    }

    public Customer removeAccount(MoneyAccount moneyAccount) {
        this.accounts.remove(moneyAccount);
        moneyAccount.setCustomer(null);
        return this;
    }

    public void setAccounts(Set<MoneyAccount> moneyAccounts) {
        this.accounts = moneyAccounts;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
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
