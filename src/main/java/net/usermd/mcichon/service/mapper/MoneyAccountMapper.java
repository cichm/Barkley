package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.MoneyAccountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MoneyAccount and its DTO MoneyAccountDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface MoneyAccountMapper extends EntityMapper<MoneyAccountDTO, MoneyAccount> {

    @Mapping(source = "customer.id", target = "customerId")
    MoneyAccountDTO toDto(MoneyAccount moneyAccount);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "cards", ignore = true)
    MoneyAccount toEntity(MoneyAccountDTO moneyAccountDTO);

    default MoneyAccount fromId(Long id) {
        if (id == null) {
            return null;
        }
        MoneyAccount moneyAccount = new MoneyAccount();
        moneyAccount.setId(id);
        return moneyAccount;
    }
}
