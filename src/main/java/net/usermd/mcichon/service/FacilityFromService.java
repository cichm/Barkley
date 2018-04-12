package net.usermd.mcichon.service;

import net.usermd.mcichon.service.dto.FacilityFromDTO;
import java.util.List;

/**
 * Service Interface for managing FacilityFrom.
 */
public interface FacilityFromService {

    /**
     * Save a facilityFrom.
     *
     * @param facilityFromDTO the entity to save
     * @return the persisted entity
     */
    FacilityFromDTO save(FacilityFromDTO facilityFromDTO);

    /**
     * Get all the facilityFroms.
     *
     * @return the list of entities
     */
    List<FacilityFromDTO> findAll();

    /**
     * Get the "id" facilityFrom.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FacilityFromDTO findOne(Long id);

    /**
     * Delete the "id" facilityFrom.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
