package net.usermd.mcichon.service.impl;

import net.usermd.mcichon.service.TransactionRegisterService;
import net.usermd.mcichon.domain.TransactionRegister;
import net.usermd.mcichon.repository.TransactionRegisterRepository;
import net.usermd.mcichon.service.dto.TransactionRegisterDTO;
import net.usermd.mcichon.service.mapper.TransactionRegisterMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TransactionRegister.
 */
@Service
@Transactional
public class TransactionRegisterServiceImpl implements TransactionRegisterService {

    private final Logger log = LoggerFactory.getLogger(TransactionRegisterServiceImpl.class);

    private final TransactionRegisterRepository transactionRegisterRepository;

    private final TransactionRegisterMapper transactionRegisterMapper;

    public TransactionRegisterServiceImpl(TransactionRegisterRepository transactionRegisterRepository, TransactionRegisterMapper transactionRegisterMapper) {
        this.transactionRegisterRepository = transactionRegisterRepository;
        this.transactionRegisterMapper = transactionRegisterMapper;
    }

    /**
     * Save a transactionRegister.
     *
     * @param transactionRegisterDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionRegisterDTO save(TransactionRegisterDTO transactionRegisterDTO) {
        log.debug("Request to save TransactionRegister : {}", transactionRegisterDTO);
        TransactionRegister transactionRegister = transactionRegisterMapper.toEntity(transactionRegisterDTO);
        transactionRegister = transactionRegisterRepository.save(transactionRegister);
        return transactionRegisterMapper.toDto(transactionRegister);
    }

    /**
     * Get all the transactionRegisters.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransactionRegisterDTO> findAll() {
        log.debug("Request to get all TransactionRegisters");
        return transactionRegisterRepository.findAll().stream()
            .map(transactionRegisterMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one transactionRegister by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TransactionRegisterDTO findOne(Long id) {
        log.debug("Request to get TransactionRegister : {}", id);
        TransactionRegister transactionRegister = transactionRegisterRepository.findOne(id);
        return transactionRegisterMapper.toDto(transactionRegister);
    }

    /**
     * Delete the transactionRegister by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionRegister : {}", id);
        transactionRegisterRepository.delete(id);
    }
}
