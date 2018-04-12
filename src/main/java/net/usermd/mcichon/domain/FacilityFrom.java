package net.usermd.mcichon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FacilityFrom.
 */
@Entity
@Table(name = "facility_from")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FacilityFrom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private MoneyAccount facility;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MoneyAccount getFacility() {
        return facility;
    }

    public FacilityFrom facility(MoneyAccount moneyAccount) {
        this.facility = moneyAccount;
        return this;
    }

    public void setFacility(MoneyAccount moneyAccount) {
        this.facility = moneyAccount;
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
        FacilityFrom facilityFrom = (FacilityFrom) o;
        if (facilityFrom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), facilityFrom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FacilityFrom{" +
            "id=" + getId() +
            "}";
    }
}
