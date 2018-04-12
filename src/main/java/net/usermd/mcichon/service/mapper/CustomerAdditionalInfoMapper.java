package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.CustomerAdditionalInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerAdditionalInfo and its DTO CustomerAdditionalInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerAdditionalInfoMapper extends EntityMapper<CustomerAdditionalInfoDTO, CustomerAdditionalInfo> {



    default CustomerAdditionalInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerAdditionalInfo customerAdditionalInfo = new CustomerAdditionalInfo();
        customerAdditionalInfo.setId(id);
        return customerAdditionalInfo;
    }
}
