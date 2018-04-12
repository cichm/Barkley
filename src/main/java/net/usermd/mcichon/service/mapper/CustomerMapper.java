package net.usermd.mcichon.service.mapper;

import net.usermd.mcichon.domain.*;
import net.usermd.mcichon.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerAdditionalInfoMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "aditionalInfo.id", target = "aditionalInfoId")
    CustomerDTO toDto(Customer customer);

    @Mapping(source = "aditionalInfoId", target = "aditionalInfo")
    @Mapping(target = "accounts", ignore = true)
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
