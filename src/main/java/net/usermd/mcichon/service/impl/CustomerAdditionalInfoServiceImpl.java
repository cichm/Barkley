package net.usermd.mcichon.service.impl;

import net.usermd.mcichon.service.CustomerAdditionalInfoService;
import net.usermd.mcichon.domain.CustomerAdditionalInfo;
import net.usermd.mcichon.repository.CustomerAdditionalInfoRepository;
import net.usermd.mcichon.service.dto.CustomerAdditionalInfoDTO;
import net.usermd.mcichon.service.mapper.CustomerAdditionalInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CustomerAdditionalInfo.
 */
@Service
@Transactional
public class CustomerAdditionalInfoServiceImpl implements CustomerAdditionalInfoService {

    private final Logger log = LoggerFactory.getLogger(CustomerAdditionalInfoServiceImpl.class);

    private final CustomerAdditionalInfoRepository customerAdditionalInfoRepository;

    private final CustomerAdditionalInfoMapper customerAdditionalInfoMapper;

    public CustomerAdditionalInfoServiceImpl(CustomerAdditionalInfoRepository customerAdditionalInfoRepository, CustomerAdditionalInfoMapper customerAdditionalInfoMapper) {
        this.customerAdditionalInfoRepository = customerAdditionalInfoRepository;
        this.customerAdditionalInfoMapper = customerAdditionalInfoMapper;
    }

    /**
     * Save a customerAdditionalInfo.
     *
     * @param customerAdditionalInfoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerAdditionalInfoDTO save(CustomerAdditionalInfoDTO customerAdditionalInfoDTO) {
        log.debug("Request to save CustomerAdditionalInfo : {}", customerAdditionalInfoDTO);
        CustomerAdditionalInfo customerAdditionalInfo = customerAdditionalInfoMapper.toEntity(customerAdditionalInfoDTO);
        customerAdditionalInfo = customerAdditionalInfoRepository.save(customerAdditionalInfo);
        return customerAdditionalInfoMapper.toDto(customerAdditionalInfo);
    }

    /**
     * Get all the customerAdditionalInfos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerAdditionalInfoDTO> findAll() {
        log.debug("Request to get all CustomerAdditionalInfos");
        return customerAdditionalInfoRepository.findAll().stream()
            .map(customerAdditionalInfoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one customerAdditionalInfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CustomerAdditionalInfoDTO findOne(Long id) {
        log.debug("Request to get CustomerAdditionalInfo : {}", id);
        CustomerAdditionalInfo customerAdditionalInfo = customerAdditionalInfoRepository.findOne(id);
        return customerAdditionalInfoMapper.toDto(customerAdditionalInfo);
    }

    /**
     * Delete the customerAdditionalInfo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerAdditionalInfo : {}", id);
        customerAdditionalInfoRepository.delete(id);
    }
}
