package net.usermd.mcichon.service.impl;

import net.usermd.mcichon.service.FacilityDestinationService;
import net.usermd.mcichon.domain.FacilityDestination;
import net.usermd.mcichon.repository.FacilityDestinationRepository;
import net.usermd.mcichon.service.dto.FacilityDestinationDTO;
import net.usermd.mcichon.service.mapper.FacilityDestinationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing FacilityDestination.
 */
@Service
@Transactional
public class FacilityDestinationServiceImpl implements FacilityDestinationService {

    private final Logger log = LoggerFactory.getLogger(FacilityDestinationServiceImpl.class);

    private final FacilityDestinationRepository facilityDestinationRepository;

    private final FacilityDestinationMapper facilityDestinationMapper;

    public FacilityDestinationServiceImpl(FacilityDestinationRepository facilityDestinationRepository, FacilityDestinationMapper facilityDestinationMapper) {
        this.facilityDestinationRepository = facilityDestinationRepository;
        this.facilityDestinationMapper = facilityDestinationMapper;
    }

    /**
     * Save a facilityDestination.
     *
     * @param facilityDestinationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FacilityDestinationDTO save(FacilityDestinationDTO facilityDestinationDTO) {
        log.debug("Request to save FacilityDestination : {}", facilityDestinationDTO);
        FacilityDestination facilityDestination = facilityDestinationMapper.toEntity(facilityDestinationDTO);
        facilityDestination = facilityDestinationRepository.save(facilityDestination);
        return facilityDestinationMapper.toDto(facilityDestination);
    }

    /**
     * Get all the facilityDestinations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FacilityDestinationDTO> findAll() {
        log.debug("Request to get all FacilityDestinations");
        return facilityDestinationRepository.findAll().stream()
            .map(facilityDestinationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one facilityDestination by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FacilityDestinationDTO findOne(Long id) {
        log.debug("Request to get FacilityDestination : {}", id);
        FacilityDestination facilityDestination = facilityDestinationRepository.findOne(id);
        return facilityDestinationMapper.toDto(facilityDestination);
    }

    /**
     * Delete the facilityDestination by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FacilityDestination : {}", id);
        facilityDestinationRepository.delete(id);
    }
}
