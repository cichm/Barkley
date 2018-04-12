package net.usermd.mcichon.web.rest;

import net.usermd.mcichon.BarkleyApp;

import net.usermd.mcichon.domain.FacilityDestination;
import net.usermd.mcichon.repository.FacilityDestinationRepository;
import net.usermd.mcichon.service.FacilityDestinationService;
import net.usermd.mcichon.service.dto.FacilityDestinationDTO;
import net.usermd.mcichon.service.mapper.FacilityDestinationMapper;
import net.usermd.mcichon.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static net.usermd.mcichon.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FacilityDestinationResource REST controller.
 *
 * @see FacilityDestinationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarkleyApp.class)
public class FacilityDestinationResourceIntTest {

    @Autowired
    private FacilityDestinationRepository facilityDestinationRepository;

    @Autowired
    private FacilityDestinationMapper facilityDestinationMapper;

    @Autowired
    private FacilityDestinationService facilityDestinationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFacilityDestinationMockMvc;

    private FacilityDestination facilityDestination;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacilityDestinationResource facilityDestinationResource = new FacilityDestinationResource(facilityDestinationService);
        this.restFacilityDestinationMockMvc = MockMvcBuilders.standaloneSetup(facilityDestinationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityDestination createEntity(EntityManager em) {
        FacilityDestination facilityDestination = new FacilityDestination();
        return facilityDestination;
    }

    @Before
    public void initTest() {
        facilityDestination = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilityDestination() throws Exception {
        int databaseSizeBeforeCreate = facilityDestinationRepository.findAll().size();

        // Create the FacilityDestination
        FacilityDestinationDTO facilityDestinationDTO = facilityDestinationMapper.toDto(facilityDestination);
        restFacilityDestinationMockMvc.perform(post("/api/facility-destinations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityDestinationDTO)))
            .andExpect(status().isCreated());

        // Validate the FacilityDestination in the database
        List<FacilityDestination> facilityDestinationList = facilityDestinationRepository.findAll();
        assertThat(facilityDestinationList).hasSize(databaseSizeBeforeCreate + 1);
        FacilityDestination testFacilityDestination = facilityDestinationList.get(facilityDestinationList.size() - 1);
    }

    @Test
    @Transactional
    public void createFacilityDestinationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilityDestinationRepository.findAll().size();

        // Create the FacilityDestination with an existing ID
        facilityDestination.setId(1L);
        FacilityDestinationDTO facilityDestinationDTO = facilityDestinationMapper.toDto(facilityDestination);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilityDestinationMockMvc.perform(post("/api/facility-destinations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityDestinationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityDestination in the database
        List<FacilityDestination> facilityDestinationList = facilityDestinationRepository.findAll();
        assertThat(facilityDestinationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFacilityDestinations() throws Exception {
        // Initialize the database
        facilityDestinationRepository.saveAndFlush(facilityDestination);

        // Get all the facilityDestinationList
        restFacilityDestinationMockMvc.perform(get("/api/facility-destinations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilityDestination.getId().intValue())));
    }

    @Test
    @Transactional
    public void getFacilityDestination() throws Exception {
        // Initialize the database
        facilityDestinationRepository.saveAndFlush(facilityDestination);

        // Get the facilityDestination
        restFacilityDestinationMockMvc.perform(get("/api/facility-destinations/{id}", facilityDestination.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(facilityDestination.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFacilityDestination() throws Exception {
        // Get the facilityDestination
        restFacilityDestinationMockMvc.perform(get("/api/facility-destinations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilityDestination() throws Exception {
        // Initialize the database
        facilityDestinationRepository.saveAndFlush(facilityDestination);
        int databaseSizeBeforeUpdate = facilityDestinationRepository.findAll().size();

        // Update the facilityDestination
        FacilityDestination updatedFacilityDestination = facilityDestinationRepository.findOne(facilityDestination.getId());
        // Disconnect from session so that the updates on updatedFacilityDestination are not directly saved in db
        em.detach(updatedFacilityDestination);
        FacilityDestinationDTO facilityDestinationDTO = facilityDestinationMapper.toDto(updatedFacilityDestination);

        restFacilityDestinationMockMvc.perform(put("/api/facility-destinations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityDestinationDTO)))
            .andExpect(status().isOk());

        // Validate the FacilityDestination in the database
        List<FacilityDestination> facilityDestinationList = facilityDestinationRepository.findAll();
        assertThat(facilityDestinationList).hasSize(databaseSizeBeforeUpdate);
        FacilityDestination testFacilityDestination = facilityDestinationList.get(facilityDestinationList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilityDestination() throws Exception {
        int databaseSizeBeforeUpdate = facilityDestinationRepository.findAll().size();

        // Create the FacilityDestination
        FacilityDestinationDTO facilityDestinationDTO = facilityDestinationMapper.toDto(facilityDestination);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFacilityDestinationMockMvc.perform(put("/api/facility-destinations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityDestinationDTO)))
            .andExpect(status().isCreated());

        // Validate the FacilityDestination in the database
        List<FacilityDestination> facilityDestinationList = facilityDestinationRepository.findAll();
        assertThat(facilityDestinationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFacilityDestination() throws Exception {
        // Initialize the database
        facilityDestinationRepository.saveAndFlush(facilityDestination);
        int databaseSizeBeforeDelete = facilityDestinationRepository.findAll().size();

        // Get the facilityDestination
        restFacilityDestinationMockMvc.perform(delete("/api/facility-destinations/{id}", facilityDestination.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FacilityDestination> facilityDestinationList = facilityDestinationRepository.findAll();
        assertThat(facilityDestinationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityDestination.class);
        FacilityDestination facilityDestination1 = new FacilityDestination();
        facilityDestination1.setId(1L);
        FacilityDestination facilityDestination2 = new FacilityDestination();
        facilityDestination2.setId(facilityDestination1.getId());
        assertThat(facilityDestination1).isEqualTo(facilityDestination2);
        facilityDestination2.setId(2L);
        assertThat(facilityDestination1).isNotEqualTo(facilityDestination2);
        facilityDestination1.setId(null);
        assertThat(facilityDestination1).isNotEqualTo(facilityDestination2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityDestinationDTO.class);
        FacilityDestinationDTO facilityDestinationDTO1 = new FacilityDestinationDTO();
        facilityDestinationDTO1.setId(1L);
        FacilityDestinationDTO facilityDestinationDTO2 = new FacilityDestinationDTO();
        assertThat(facilityDestinationDTO1).isNotEqualTo(facilityDestinationDTO2);
        facilityDestinationDTO2.setId(facilityDestinationDTO1.getId());
        assertThat(facilityDestinationDTO1).isEqualTo(facilityDestinationDTO2);
        facilityDestinationDTO2.setId(2L);
        assertThat(facilityDestinationDTO1).isNotEqualTo(facilityDestinationDTO2);
        facilityDestinationDTO1.setId(null);
        assertThat(facilityDestinationDTO1).isNotEqualTo(facilityDestinationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(facilityDestinationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(facilityDestinationMapper.fromId(null)).isNull();
    }
}
