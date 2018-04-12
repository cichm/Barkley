package net.usermd.mcichon.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import net.usermd.mcichon.domain.enumeration.TransactionType;

/**
 * A DTO for the TransactionRegister entity.
 */
public class TransactionRegisterDTO implements Serializable {

    private Long id;

    private Instant date;

    @NotNull
    private Double amount;

    private TransactionType type;

    private Long fromId;

    private Long destinationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public Long getFromId() {
        return fromId;
    }

    public void setFromId(Long facilityFromId) {
        this.fromId = facilityFromId;
    }

    public Long getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Long facilityDestinationId) {
        this.destinationId = facilityDestinationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransactionRegisterDTO transactionRegisterDTO = (TransactionRegisterDTO) o;
        if(transactionRegisterDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionRegisterDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionRegisterDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", amount=" + getAmount() +
            ", type='" + getType() + "'" +
            "}";
    }
}
