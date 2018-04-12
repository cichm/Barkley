package net.usermd.mcichon.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.usermd.mcichon.service.MoneyAccountService;
import net.usermd.mcichon.web.rest.errors.BadRequestAlertException;
import net.usermd.mcichon.web.rest.util.HeaderUtil;
import net.usermd.mcichon.service.dto.MoneyAccountDTO;
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
 * REST controller for managing MoneyAccount.
 */
@RestController
@RequestMapping("/api")
public class MoneyAccountResource {

    private final Logger log = LoggerFactory.getLogger(MoneyAccountResource.class);

    private static final String ENTITY_NAME = "moneyAccount";

    private final MoneyAccountService moneyAccountService;

    public MoneyAccountResource(MoneyAccountService moneyAccountService) {
        this.moneyAccountService = moneyAccountService;
    }

    /**
     * POST  /money-accounts : Create a new moneyAccount.
     *
     * @param moneyAccountDTO the moneyAccountDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new moneyAccountDTO, or with status 400 (Bad Request) if the moneyAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/money-accounts")
    @Timed
    public ResponseEntity<MoneyAccountDTO> createMoneyAccount(@Valid @RequestBody MoneyAccountDTO moneyAccountDTO) throws URISyntaxException {
        log.debug("REST request to save MoneyAccount : {}", moneyAccountDTO);
        if (moneyAccountDTO.getId() != null) {
            throw new BadRequestAlertException("A new moneyAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MoneyAccountDTO result = moneyAccountService.save(moneyAccountDTO);
        return ResponseEntity.created(new URI("/api/money-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /money-accounts : Updates an existing moneyAccount.
     *
     * @param moneyAccountDTO the moneyAccountDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated moneyAccountDTO,
     * or with status 400 (Bad Request) if the moneyAccountDTO is not valid,
     * or with status 500 (Internal Server Error) if the moneyAccountDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/money-accounts")
    @Timed
    public ResponseEntity<MoneyAccountDTO> updateMoneyAccount(@Valid @RequestBody MoneyAccountDTO moneyAccountDTO) throws URISyntaxException {
        log.debug("REST request to update MoneyAccount : {}", moneyAccountDTO);
        if (moneyAccountDTO.getId() == null) {
            return createMoneyAccount(moneyAccountDTO);
        }
        MoneyAccountDTO result = moneyAccountService.save(moneyAccountDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, moneyAccountDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /money-accounts : get all the moneyAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of moneyAccounts in body
     */
    @GetMapping("/money-accounts")
    @Timed
    public List<MoneyAccountDTO> getAllMoneyAccounts() {
        log.debug("REST request to get all MoneyAccounts");
        return moneyAccountService.findAll();
        }

    /**
     * GET  /money-accounts/:id : get the "id" moneyAccount.
     *
     * @param id the id of the moneyAccountDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the moneyAccountDTO, or with status 404 (Not Found)
     */
    @GetMapping("/money-accounts/{id}")
    @Timed
    public ResponseEntity<MoneyAccountDTO> getMoneyAccount(@PathVariable Long id) {
        log.debug("REST request to get MoneyAccount : {}", id);
        MoneyAccountDTO moneyAccountDTO = moneyAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(moneyAccountDTO));
    }

    /**
     * DELETE  /money-accounts/:id : delete the "id" moneyAccount.
     *
     * @param id the id of the moneyAccountDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/money-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteMoneyAccount(@PathVariable Long id) {
        log.debug("REST request to delete MoneyAccount : {}", id);
        moneyAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
