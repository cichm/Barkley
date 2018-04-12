package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.TransactionRegisterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransactionRegister and its DTO TransactionRegisterDTO.
 */
@Mapper(componentModel = "spring", uses = {FacilityFromMapper.class, FacilityDestinationMapper.class})
public interface TransactionRegisterMapper extends EntityMapper<TransactionRegisterDTO, TransactionRegister> {

    @Mapping(source = "from.id", target = "fromId")
    @Mapping(source = "destination.id", target = "destinationId")
    TransactionRegisterDTO toDto(TransactionRegister transactionRegister);

    @Mapping(source = "fromId", target = "from")
    @Mapping(source = "destinationId", target = "destination")
    TransactionRegister toEntity(TransactionRegisterDTO transactionRegisterDTO);

    default TransactionRegister fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransactionRegister transactionRegister = new TransactionRegister();
        transactionRegister.setId(id);
        return transactionRegister;
    }
}
