package net.usermd.mcichon.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import net.usermd.mcichon.domain.enumeration.AccountType;
import net.usermd.mcichon.domain.enumeration.Currency;

/**
 * A DTO for the MoneyAccount entity.
 */
public class MoneyAccountDTO implements Serializable {

    private Long id;

    private AccountType type;

    @NotNull
    @Size(max = 26)
    private String number;

    private Currency currency;

    @NotNull
    private Boolean isActive;

    @NotNull
    private Double saldo;

    private Long customerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MoneyAccountDTO moneyAccountDTO = (MoneyAccountDTO) o;
        if(moneyAccountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), moneyAccountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MoneyAccountDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", number='" + getNumber() + "'" +
            ", currency='" + getCurrency() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", saldo=" + getSaldo() +
            "}";
    }
}
