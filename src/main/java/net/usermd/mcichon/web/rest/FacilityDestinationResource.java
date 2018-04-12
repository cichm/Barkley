package net.usermd.mcichon.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.usermd.mcichon.service.FacilityDestinationService;
import net.usermd.mcichon.web.rest.errors.BadRequestAlertException;
import net.usermd.mcichon.web.rest.util.HeaderUtil;
import net.usermd.mcichon.service.dto.FacilityDestinationDTO;
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
 * REST controller for managing FacilityDestination.
 */
@RestController
@RequestMapping("/api")
public class FacilityDestinationResource {

    private final Logger log = LoggerFactory.getLogger(FacilityDestinationResource.class);

    private static final String ENTITY_NAME = "facilityDestination";

    private final FacilityDestinationService facilityDestinationService;

    public FacilityDestinationResource(FacilityDestinationService facilityDestinationService) {
        this.facilityDestinationService = facilityDestinationService;
    }

    /**
     * POST  /facility-destinations : Create a new facilityDestination.
     *
     * @param facilityDestinationDTO the facilityDestinationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new facilityDestinationDTO, or with status 400 (Bad Request) if the facilityDestination has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/facility-destinations")
    @Timed
    public ResponseEntity<FacilityDestinationDTO> createFacilityDestination(@RequestBody FacilityDestinationDTO facilityDestinationDTO) throws URISyntaxException {
        log.debug("REST request to save FacilityDestination : {}", facilityDestinationDTO);
        if (facilityDestinationDTO.getId() != null) {
            throw new BadRequestAlertException("A new facilityDestination cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacilityDestinationDTO result = facilityDestinationService.save(facilityDestinationDTO);
        return ResponseEntity.created(new URI("/api/facility-destinations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /facility-destinations : Updates an existing facilityDestination.
     *
     * @param facilityDestinationDTO the facilityDestinationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated facilityDestinationDTO,
     * or with status 400 (Bad Request) if the facilityDestinationDTO is not valid,
     * or with status 500 (Internal Server Error) if the facilityDestinationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/facility-destinations")
    @Timed
    public ResponseEntity<FacilityDestinationDTO> updateFacilityDestination(@RequestBody FacilityDestinationDTO facilityDestinationDTO) throws URISyntaxException {
        log.debug("REST request to update FacilityDestination : {}", facilityDestinationDTO);
        if (facilityDestinationDTO.getId() == null) {
            return createFacilityDestination(facilityDestinationDTO);
        }
        FacilityDestinationDTO result = facilityDestinationService.save(facilityDestinationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, facilityDestinationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /facility-destinations : get all the facilityDestinations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of facilityDestinations in body
     */
    @GetMapping("/facility-destinations")
    @Timed
    public List<FacilityDestinationDTO> getAllFacilityDestinations() {
        log.debug("REST request to get all FacilityDestinations");
        return facilityDestinationService.findAll();
        }

    /**
     * GET  /facility-destinations/:id : get the "id" facilityDestination.
     *
     * @param id the id of the facilityDestinationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the facilityDestinationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/facility-destinations/{id}")
    @Timed
    public ResponseEntity<FacilityDestinationDTO> getFacilityDestination(@PathVariable Long id) {
        log.debug("REST request to get FacilityDestination : {}", id);
        FacilityDestinationDTO facilityDestinationDTO = facilityDestinationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(facilityDestinationDTO));
    }

    /**
     * DELETE  /facility-destinations/:id : delete the "id" facilityDestination.
     *
     * @param id the id of the facilityDestinationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/facility-destinations/{id}")
    @Timed
    public ResponseEntity<Void> deleteFacilityDestination(@PathVariable Long id) {
        log.debug("REST request to delete FacilityDestination : {}", id);
        facilityDestinationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
