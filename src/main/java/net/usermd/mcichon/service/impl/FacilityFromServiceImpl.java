package net.usermd.mcichon.service.impl;

import net.usermd.mcichon.service.FacilityFromService;
import net.usermd.mcichon.domain.FacilityFrom;
import net.usermd.mcichon.repository.FacilityFromRepository;
import net.usermd.mcichon.service.dto.FacilityFromDTO;
import net.usermd.mcichon.service.mapper.FacilityFromMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing FacilityFrom.
 */
@Service
@Transactional
public class FacilityFromServiceImpl implements FacilityFromService {

    private final Logger log = LoggerFactory.getLogger(FacilityFromServiceImpl.class);

    private final FacilityFromRepository facilityFromRepository;

    private final FacilityFromMapper facilityFromMapper;

    public FacilityFromServiceImpl(FacilityFromRepository facilityFromRepository, FacilityFromMapper facilityFromMapper) {
        this.facilityFromRepository = facilityFromRepository;
        this.facilityFromMapper = facilityFromMapper;
    }

    /**
     * Save a facilityFrom.
     *
     * @param facilityFromDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FacilityFromDTO save(FacilityFromDTO facilityFromDTO) {
        log.debug("Request to save FacilityFrom : {}", facilityFromDTO);
        FacilityFrom facilityFrom = facilityFromMapper.toEntity(facilityFromDTO);
        facilityFrom = facilityFromRepository.save(facilityFrom);
        return facilityFromMapper.toDto(facilityFrom);
    }

    /**
     * Get all the facilityFroms.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FacilityFromDTO> findAll() {
        log.debug("Request to get all FacilityFroms");
        return facilityFromRepository.findAll().stream()
            .map(facilityFromMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one facilityFrom by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FacilityFromDTO findOne(Long id) {
        log.debug("Request to get FacilityFrom : {}", id);
        FacilityFrom facilityFrom = facilityFromRepository.findOne(id);
        return facilityFromMapper.toDto(facilityFrom);
    }

    /**
     * Delete the facilityFrom by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FacilityFrom : {}", id);
        facilityFromRepository.delete(id);
    }
}
