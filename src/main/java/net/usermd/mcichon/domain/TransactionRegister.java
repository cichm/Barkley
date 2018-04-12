package net.usermd.mcichon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import net.usermd.mcichon.domain.enumeration.TransactionType;

/**
 * A TransactionRegister.
 */
@Entity
@Table(name = "transaction_register")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransactionRegister implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private Instant date;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TransactionType type;

    @OneToOne
    @JoinColumn(unique = true)
    private FacilityFrom from;

    @OneToOne
    @JoinColumn(unique = true)
    private FacilityDestination destination;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public TransactionRegister date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public TransactionRegister amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return type;
    }

    public TransactionRegister type(TransactionType type) {
        this.type = type;
        return this;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public FacilityFrom getFrom() {
        return from;
    }

    public TransactionRegister from(FacilityFrom facilityFrom) {
        this.from = facilityFrom;
        return this;
    }

    public void setFrom(FacilityFrom facilityFrom) {
        this.from = facilityFrom;
    }

    public FacilityDestination getDestination() {
        return destination;
    }

    public TransactionRegister destination(FacilityDestination facilityDestination) {
        this.destination = facilityDestination;
        return this;
    }

    public void setDestination(FacilityDestination facilityDestination) {
        this.destination = facilityDestination;
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
        TransactionRegister transactionRegister = (TransactionRegister) o;
        if (transactionRegister.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionRegister.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionRegister{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", amount=" + getAmount() +
            ", type='" + getType() + "'" +
            "}";
    }
}
