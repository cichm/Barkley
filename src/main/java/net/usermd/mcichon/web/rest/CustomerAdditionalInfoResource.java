package net.usermd.mcichon.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.usermd.mcichon.service.CustomerAdditionalInfoService;
import net.usermd.mcichon.web.rest.errors.BadRequestAlertException;
import net.usermd.mcichon.web.rest.util.HeaderUtil;
import net.usermd.mcichon.service.dto.CustomerAdditionalInfoDTO;
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
 * REST controller for managing CustomerAdditionalInfo.
 */
@RestController
@RequestMapping("/api")
public class CustomerAdditionalInfoResource {

    private final Logger log = LoggerFactory.getLogger(CustomerAdditionalInfoResource.class);

    private static final String ENTITY_NAME = "customerAdditionalInfo";

    private final CustomerAdditionalInfoService customerAdditionalInfoService;

    public CustomerAdditionalInfoResource(CustomerAdditionalInfoService customerAdditionalInfoService) {
        this.customerAdditionalInfoService = customerAdditionalInfoService;
    }

    /**
     * POST  /customer-additional-infos : Create a new customerAdditionalInfo.
     *
     * @param customerAdditionalInfoDTO the customerAdditionalInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerAdditionalInfoDTO, or with status 400 (Bad Request) if the customerAdditionalInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-additional-infos")
    @Timed
    public ResponseEntity<CustomerAdditionalInfoDTO> createCustomerAdditionalInfo(@Valid @RequestBody CustomerAdditionalInfoDTO customerAdditionalInfoDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerAdditionalInfo : {}", customerAdditionalInfoDTO);
        if (customerAdditionalInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerAdditionalInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerAdditionalInfoDTO result = customerAdditionalInfoService.save(customerAdditionalInfoDTO);
        return ResponseEntity.created(new URI("/api/customer-additional-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-additional-infos : Updates an existing customerAdditionalInfo.
     *
     * @param customerAdditionalInfoDTO the customerAdditionalInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerAdditionalInfoDTO,
     * or with status 400 (Bad Request) if the customerAdditionalInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerAdditionalInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-additional-infos")
    @Timed
    public ResponseEntity<CustomerAdditionalInfoDTO> updateCustomerAdditionalInfo(@Valid @RequestBody CustomerAdditionalInfoDTO customerAdditionalInfoDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerAdditionalInfo : {}", customerAdditionalInfoDTO);
        if (customerAdditionalInfoDTO.getId() == null) {
            return createCustomerAdditionalInfo(customerAdditionalInfoDTO);
        }
        CustomerAdditionalInfoDTO result = customerAdditionalInfoService.save(customerAdditionalInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerAdditionalInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-additional-infos : get all the customerAdditionalInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerAdditionalInfos in body
     */
    @GetMapping("/customer-additional-infos")
    @Timed
    public List<CustomerAdditionalInfoDTO> getAllCustomerAdditionalInfos() {
        log.debug("REST request to get all CustomerAdditionalInfos");
        return customerAdditionalInfoService.findAll();
        }

    /**
     * GET  /customer-additional-infos/:id : get the "id" customerAdditionalInfo.
     *
     * @param id the id of the customerAdditionalInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerAdditionalInfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-additional-infos/{id}")
    @Timed
    public ResponseEntity<CustomerAdditionalInfoDTO> getCustomerAdditionalInfo(@PathVariable Long id) {
        log.debug("REST request to get CustomerAdditionalInfo : {}", id);
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = customerAdditionalInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerAdditionalInfoDTO));
    }

    /**
     * DELETE  /customer-additional-infos/:id : delete the "id" customerAdditionalInfo.
     *
     * @param id the id of the customerAdditionalInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-additional-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerAdditionalInfo(@PathVariable Long id) {
        log.debug("REST request to delete CustomerAdditionalInfo : {}", id);
        customerAdditionalInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
