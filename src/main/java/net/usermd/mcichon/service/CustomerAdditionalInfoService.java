package net.usermd.mcichon.service;

import net.usermd.mcichon.service.dto.CustomerAdditionalInfoDTO;
import java.util.List;

/**
 * Service Interface for managing CustomerAdditionalInfo.
 */
public interface CustomerAdditionalInfoService {

    /**
     * Save a customerAdditionalInfo.
     *
     * @param customerAdditionalInfoDTO the entity to save
     * @return the persisted entity
     */
    CustomerAdditionalInfoDTO save(CustomerAdditionalInfoDTO customerAdditionalInfoDTO);

    /**
     * Get all the customerAdditionalInfos.
     *
     * @return the list of entities
     */
    List<CustomerAdditionalInfoDTO> findAll();

    /**
     * Get the "id" customerAdditionalInfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CustomerAdditionalInfoDTO findOne(Long id);

    /**
     * Delete the "id" customerAdditionalInfo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
