package net.usermd.mcichon.service.impl;

import net.usermd.mcichon.service.MoneyAccountService;
import net.usermd.mcichon.domain.MoneyAccount;
import net.usermd.mcichon.repository.MoneyAccountRepository;
import net.usermd.mcichon.service.dto.MoneyAccountDTO;
import net.usermd.mcichon.service.mapper.MoneyAccountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing MoneyAccount.
 */
@Service
@Transactional
public class MoneyAccountServiceImpl implements MoneyAccountService {

    private final Logger log = LoggerFactory.getLogger(MoneyAccountServiceImpl.class);

    private final MoneyAccountRepository moneyAccountRepository;

    private final MoneyAccountMapper moneyAccountMapper;

    public MoneyAccountServiceImpl(MoneyAccountRepository moneyAccountRepository, MoneyAccountMapper moneyAccountMapper) {
        this.moneyAccountRepository = moneyAccountRepository;
        this.moneyAccountMapper = moneyAccountMapper;
    }

    /**
     * Save a moneyAccount.
     *
     * @param moneyAccountDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MoneyAccountDTO save(MoneyAccountDTO moneyAccountDTO) {
        log.debug("Request to save MoneyAccount : {}", moneyAccountDTO);
        MoneyAccount moneyAccount = moneyAccountMapper.toEntity(moneyAccountDTO);
        moneyAccount = moneyAccountRepository.save(moneyAccount);
        return moneyAccountMapper.toDto(moneyAccount);
    }

    /**
     * Get all the moneyAccounts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MoneyAccountDTO> findAll() {
        log.debug("Request to get all MoneyAccounts");
        return moneyAccountRepository.findAll().stream()
            .map(moneyAccountMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one moneyAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MoneyAccountDTO findOne(Long id) {
        log.debug("Request to get MoneyAccount : {}", id);
        MoneyAccount moneyAccount = moneyAccountRepository.findOne(id);
        return moneyAccountMapper.toDto(moneyAccount);
    }

    /**
     * Delete the moneyAccount by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MoneyAccount : {}", id);
        moneyAccountRepository.delete(id);
    }
}
