package net.usermd.mcichon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import net.usermd.mcichon.domain.enumeration.CardType;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private CardType type;

    @NotNull
    @Size(max = 16)
    @Column(name = "jhi_number", length = 16, nullable = false)
    private String number;

    @NotNull
    @Size(max = 5)
    @Pattern(regexp = "[0-9]{2}\\/[0-9]{2}")
    @Column(name = "valid", length = 5, nullable = false)
    private String valid;

    @ManyToOne
    private MoneyAccount moneyAccount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CardType getType() {
        return type;
    }

    public Card type(CardType type) {
        this.type = type;
        return this;
    }

    public void setType(CardType type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public Card number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getValid() {
        return valid;
    }

    public Card valid(String valid) {
        this.valid = valid;
        return this;
    }

    public void setValid(String valid) {
        this.valid = valid;
    }

    public MoneyAccount getMoneyAccount() {
        return moneyAccount;
    }

    public Card moneyAccount(MoneyAccount moneyAccount) {
        this.moneyAccount = moneyAccount;
        return this;
    }

    public void setMoneyAccount(MoneyAccount moneyAccount) {
        this.moneyAccount = moneyAccount;
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
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", number='" + getNumber() + "'" +
            ", valid='" + getValid() + "'" +
            "}";
    }
}
