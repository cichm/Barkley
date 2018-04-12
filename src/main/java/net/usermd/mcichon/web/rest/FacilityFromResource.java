package net.usermd.mcichon.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.usermd.mcichon.service.FacilityFromService;
import net.usermd.mcichon.web.rest.errors.BadRequestAlertException;
import net.usermd.mcichon.web.rest.util.HeaderUtil;
import net.usermd.mcichon.service.dto.FacilityFromDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FacilityFrom.
 */
@RestController
@RequestMapping("/api")
public class FacilityFromResource {

    private final Logger log = LoggerFactory.getLogger(FacilityFromResource.class);

    private static final String ENTITY_NAME = "facilityFrom";

    private final FacilityFromService facilityFromService;

    public FacilityFromResource(FacilityFromService facilityFromService) {
        this.facilityFromService = facilityFromService;
    }

    /**
     * POST  /facility-froms : Create a new facilityFrom.
     *
     * @param facilityFromDTO the facilityFromDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new facilityFromDTO, or with status 400 (Bad Request) if the facilityFrom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/facility-froms")
    @Timed
    public ResponseEntity<FacilityFromDTO> createFacilityFrom(@RequestBody FacilityFromDTO facilityFromDTO) throws URISyntaxException {
        log.debug("REST request to save FacilityFrom : {}", facilityFromDTO);
        if (facilityFromDTO.getId() != null) {
            throw new BadRequestAlertException("A new facilityFrom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacilityFromDTO result = facilityFromService.save(facilityFromDTO);
        return ResponseEntity.created(new URI("/api/facility-froms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /facility-froms : Updates an existing facilityFrom.
     *
     * @param facilityFromDTO the facilityFromDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated facilityFromDTO,
     * or with status 400 (Bad Request) if the facilityFromDTO is not valid,
     * or with status 500 (Internal Server Error) if the facilityFromDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/facility-froms")
    @Timed
    public ResponseEntity<FacilityFromDTO> updateFacilityFrom(@RequestBody FacilityFromDTO facilityFromDTO) throws URISyntaxException {
        log.debug("REST request to update FacilityFrom : {}", facilityFromDTO);
        if (facilityFromDTO.getId() == null) {
            return createFacilityFrom(facilityFromDTO);
        }
        FacilityFromDTO result = facilityFromService.save(facilityFromDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, facilityFromDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /facility-froms : get all the facilityFroms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of facilityFroms in body
     */
    @GetMapping("/facility-froms")
    @Timed
    public List<FacilityFromDTO> getAllFacilityFroms() {
        log.debug("REST request to get all FacilityFroms");
        return facilityFromService.findAll();
        }

    /**
     * GET  /facility-froms/:id : get the "id" facilityFrom.
     *
     * @param id the id of the facilityFromDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the facilityFromDTO, or with status 404 (Not Found)
     */
    @GetMapping("/facility-froms/{id}")
    @Timed
    public ResponseEntity<FacilityFromDTO> getFacilityFrom(@PathVariable Long id) {
        log.debug("REST request to get FacilityFrom : {}", id);
        FacilityFromDTO facilityFromDTO = facilityFromService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(facilityFromDTO));
    }

    /**
     * DELETE  /facility-froms/:id : delete the "id" facilityFrom.
     *
     * @param id the id of the facilityFromDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/facility-froms/{id}")
    @Timed
    public ResponseEntity<Void> deleteFacilityFrom(@PathVariable Long id) {
        log.debug("REST request to delete FacilityFrom : {}", id);
        facilityFromService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
