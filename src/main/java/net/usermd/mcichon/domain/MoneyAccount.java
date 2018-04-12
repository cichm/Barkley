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

import net.usermd.mcichon.domain.enumeration.AccountType;

import net.usermd.mcichon.domain.enumeration.Currency;

/**
 * A MoneyAccount.
 */
@Entity
@Table(name = "money_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MoneyAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private AccountType type;

    @NotNull
    @Size(max = 26)
    @Column(name = "jhi_number", length = 26, nullable = false)
    private String number;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private Currency currency;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @NotNull
    @Column(name = "saldo", nullable = false)
    private Double saldo;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "moneyAccount")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Card> cards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountType getType() {
        return type;
    }

    public MoneyAccount type(AccountType type) {
        this.type = type;
        return this;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public MoneyAccount number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Currency getCurrency() {
        return currency;
    }

    public MoneyAccount currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public MoneyAccount isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getSaldo() {
        return saldo;
    }

    public MoneyAccount saldo(Double saldo) {
        this.saldo = saldo;
        return this;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public Customer getCustomer() {
        return customer;
    }

    public MoneyAccount customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public MoneyAccount cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public MoneyAccount addCard(Card card) {
        this.cards.add(card);
        card.setMoneyAccount(this);
        return this;
    }

    public MoneyAccount removeCard(Card card) {
        this.cards.remove(card);
        card.setMoneyAccount(null);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
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
        MoneyAccount moneyAccount = (MoneyAccount) o;
        if (moneyAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), moneyAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MoneyAccount{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", number='" + getNumber() + "'" +
            ", currency='" + getCurrency() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", saldo=" + getSaldo() +
            "}";
    }
}
