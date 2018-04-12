package net.usermd.mcichon.service;

import net.usermd.mcichon.service.dto.FacilityDestinationDTO;
import java.util.List;

/**
 * Service Interface for managing FacilityDestination.
 */
public interface FacilityDestinationService {

    /**
     * Save a facilityDestination.
     *
     * @param facilityDestinationDTO the entity to save
     * @return the persisted entity
     */
    FacilityDestinationDTO save(FacilityDestinationDTO facilityDestinationDTO);

    /**
     * Get all the facilityDestinations.
     *
     * @return the list of entities
     */
    List<FacilityDestinationDTO> findAll();

    /**
     * Get the "id" facilityDestination.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FacilityDestinationDTO findOne(Long id);

    /**
     * Delete the "id" facilityDestination.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
