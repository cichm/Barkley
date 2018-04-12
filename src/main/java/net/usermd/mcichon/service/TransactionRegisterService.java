package net.usermd.mcichon.service;

import net.usermd.mcichon.service.dto.TransactionRegisterDTO;
import java.util.List;

/**
 * Service Interface for managing TransactionRegister.
 */
public interface TransactionRegisterService {

    /**
     * Save a transactionRegister.
     *
     * @param transactionRegisterDTO the entity to save
     * @return the persisted entity
     */
    TransactionRegisterDTO save(TransactionRegisterDTO transactionRegisterDTO);

    /**
     * Get all the transactionRegisters.
     *
     * @return the list of entities
     */
    List<TransactionRegisterDTO> findAll();

    /**
     * Get the "id" transactionRegister.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TransactionRegisterDTO findOne(Long id);

    /**
     * Delete the "id" transactionRegister.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
