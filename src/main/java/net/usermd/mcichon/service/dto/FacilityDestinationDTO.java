package net.usermd.mcichon.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FacilityDestination entity.
 */
public class FacilityDestinationDTO implements Serializable {

    private Long id;

    private Long facilityId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(Long moneyAccountId) {
        this.facilityId = moneyAccountId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FacilityDestinationDTO facilityDestinationDTO = (FacilityDestinationDTO) o;
        if(facilityDestinationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), facilityDestinationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FacilityDestinationDTO{" +
            "id=" + getId() +
            "}";
    }
}
