package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.FacilityDestinationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FacilityDestination and its DTO FacilityDestinationDTO.
 */
@Mapper(componentModel = "spring", uses = {MoneyAccountMapper.class})
public interface FacilityDestinationMapper extends EntityMapper<FacilityDestinationDTO, FacilityDestination> {

    @Mapping(source = "facility.id", target = "facilityId")
    FacilityDestinationDTO toDto(FacilityDestination facilityDestination);

    @Mapping(source = "facilityId", target = "facility")
    FacilityDestination toEntity(FacilityDestinationDTO facilityDestinationDTO);

    default FacilityDestination fromId(Long id) {
        if (id == null) {
            return null;
        }
        FacilityDestination facilityDestination = new FacilityDestination();
        facilityDestination.setId(id);
        return facilityDestination;
    }
}
