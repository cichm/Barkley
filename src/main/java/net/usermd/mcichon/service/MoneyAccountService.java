package net.usermd.mcichon.service;

import net.usermd.mcichon.service.dto.MoneyAccountDTO;
import java.util.List;

/**
 * Service Interface for managing MoneyAccount.
 */
public interface MoneyAccountService {

    /**
     * Save a moneyAccount.
     *
     * @param moneyAccountDTO the entity to save
     * @return the persisted entity
     */
    MoneyAccountDTO save(MoneyAccountDTO moneyAccountDTO);

    /**
     * Get all the moneyAccounts.
     *
     * @return the list of entities
     */
    List<MoneyAccountDTO> findAll();

    /**
     * Get the "id" moneyAccount.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MoneyAccountDTO findOne(Long id);

    /**
     * Delete the "id" moneyAccount.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
