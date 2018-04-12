package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.FacilityFromDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FacilityFrom and its DTO FacilityFromDTO.
 */
@Mapper(componentModel = "spring", uses = {MoneyAccountMapper.class})
public interface FacilityFromMapper extends EntityMapper<FacilityFromDTO, FacilityFrom> {

    @Mapping(source = "facility.id", target = "facilityId")
    FacilityFromDTO toDto(FacilityFrom facilityFrom);

    @Mapping(source = "facilityId", target = "facility")
    FacilityFrom toEntity(FacilityFromDTO facilityFromDTO);

    default FacilityFrom fromId(Long id) {
        if (id == null) {
            return null;
        }
        FacilityFrom facilityFrom = new FacilityFrom();
        facilityFrom.setId(id);
        return facilityFrom;
    }
}
