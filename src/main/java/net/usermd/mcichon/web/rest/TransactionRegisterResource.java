package net.usermd.mcichon.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.usermd.mcichon.service.TransactionRegisterService;
import net.usermd.mcichon.web.rest.errors.BadRequestAlertException;
import net.usermd.mcichon.web.rest.util.HeaderUtil;
import net.usermd.mcichon.service.dto.TransactionRegisterDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TransactionRegister.
 */
@RestController
@RequestMapping("/api")
public class TransactionRegisterResource {

    private final Logger log = LoggerFactory.getLogger(TransactionRegisterResource.class);

    private static final String ENTITY_NAME = "transactionRegister";

    private final TransactionRegisterService transactionRegisterService;

    public TransactionRegisterResource(TransactionRegisterService transactionRegisterService) {
        this.transactionRegisterService = transactionRegisterService;
    }

    /**
     * POST  /transaction-registers : Create a new transactionRegister.
     *
     * @param transactionRegisterDTO the transactionRegisterDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transactionRegisterDTO, or with status 400 (Bad Request) if the transactionRegister has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaction-registers")
    @Timed
    public ResponseEntity<TransactionRegisterDTO> createTransactionRegister(@Valid @RequestBody TransactionRegisterDTO transactionRegisterDTO) throws URISyntaxException {
        log.debug("REST request to save TransactionRegister : {}", transactionRegisterDTO);
        if (transactionRegisterDTO.getId() != null) {
            throw new BadRequestAlertException("A new transactionRegister cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransactionRegisterDTO result = transactionRegisterService.save(transactionRegisterDTO);
        return ResponseEntity.created(new URI("/api/transaction-registers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaction-registers : Updates an existing transactionRegister.
     *
     * @param transactionRegisterDTO the transactionRegisterDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transactionRegisterDTO,
     * or with status 400 (Bad Request) if the transactionRegisterDTO is not valid,
     * or with status 500 (Internal Server Error) if the transactionRegisterDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaction-registers")
    @Timed
    public ResponseEntity<TransactionRegisterDTO> updateTransactionRegister(@Valid @RequestBody TransactionRegisterDTO transactionRegisterDTO) throws URISyntaxException {
        log.debug("REST request to update TransactionRegister : {}", transactionRegisterDTO);
        if (transactionRegisterDTO.getId() == null) {
            return createTransactionRegister(transactionRegisterDTO);
        }
        TransactionRegisterDTO result = transactionRegisterService.save(transactionRegisterDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transactionRegisterDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaction-registers : get all the transactionRegisters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transactionRegisters in body
     */
    @GetMapping("/transaction-registers")
    @Timed
    public List<TransactionRegisterDTO> getAllTransactionRegisters() {
        log.debug("REST request to get all TransactionRegisters");
        return transactionRegisterService.findAll();
        }

    /**
     * GET  /transaction-registers/:id : get the "id" transactionRegister.
     *
     * @param id the id of the transactionRegisterDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transactionRegisterDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transaction-registers/{id}")
    @Timed
    public ResponseEntity<TransactionRegisterDTO> getTransactionRegister(@PathVariable Long id) {
        log.debug("REST request to get TransactionRegister : {}", id);
        TransactionRegisterDTO transactionRegisterDTO = transactionRegisterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transactionRegisterDTO));
    }

    /**
     * DELETE  /transaction-registers/:id : delete the "id" transactionRegister.
     *
     * @param id the id of the transactionRegisterDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaction-registers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransactionRegister(@PathVariable Long id) {
        log.debug("REST request to delete TransactionRegister : {}", id);
        transactionRegisterService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
