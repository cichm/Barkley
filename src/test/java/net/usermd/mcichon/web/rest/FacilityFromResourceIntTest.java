package net.usermd.mcichon.web.rest;

import net.usermd.mcichon.BarkleyApp;

import net.usermd.mcichon.domain.FacilityFrom;
import net.usermd.mcichon.repository.FacilityFromRepository;
import net.usermd.mcichon.service.FacilityFromService;
import net.usermd.mcichon.service.dto.FacilityFromDTO;
import net.usermd.mcichon.service.mapper.FacilityFromMapper;
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
 * Test class for the FacilityFromResource REST controller.
 *
 * @see FacilityFromResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarkleyApp.class)
public class FacilityFromResourceIntTest {

    @Autowired
    private FacilityFromRepository facilityFromRepository;

    @Autowired
    private FacilityFromMapper facilityFromMapper;

    @Autowired
    private FacilityFromService facilityFromService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFacilityFromMockMvc;

    private FacilityFrom facilityFrom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacilityFromResource facilityFromResource = new FacilityFromResource(facilityFromService);
        this.restFacilityFromMockMvc = MockMvcBuilders.standaloneSetup(facilityFromResource)
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
    public static FacilityFrom createEntity(EntityManager em) {
        FacilityFrom facilityFrom = new FacilityFrom();
        return facilityFrom;
    }

    @Before
    public void initTest() {
        facilityFrom = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilityFrom() throws Exception {
        int databaseSizeBeforeCreate = facilityFromRepository.findAll().size();

        // Create the FacilityFrom
        FacilityFromDTO facilityFromDTO = facilityFromMapper.toDto(facilityFrom);
        restFacilityFromMockMvc.perform(post("/api/facility-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityFromDTO)))
            .andExpect(status().isCreated());

        // Validate the FacilityFrom in the database
        List<FacilityFrom> facilityFromList = facilityFromRepository.findAll();
        assertThat(facilityFromList).hasSize(databaseSizeBeforeCreate + 1);
        FacilityFrom testFacilityFrom = facilityFromList.get(facilityFromList.size() - 1);
    }

    @Test
    @Transactional
    public void createFacilityFromWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilityFromRepository.findAll().size();

        // Create the FacilityFrom with an existing ID
        facilityFrom.setId(1L);
        FacilityFromDTO facilityFromDTO = facilityFromMapper.toDto(facilityFrom);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilityFromMockMvc.perform(post("/api/facility-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityFromDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityFrom in the database
        List<FacilityFrom> facilityFromList = facilityFromRepository.findAll();
        assertThat(facilityFromList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFacilityFroms() throws Exception {
        // Initialize the database
        facilityFromRepository.saveAndFlush(facilityFrom);

        // Get all the facilityFromList
        restFacilityFromMockMvc.perform(get("/api/facility-froms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilityFrom.getId().intValue())));
    }

    @Test
    @Transactional
    public void getFacilityFrom() throws Exception {
        // Initialize the database
        facilityFromRepository.saveAndFlush(facilityFrom);

        // Get the facilityFrom
        restFacilityFromMockMvc.perform(get("/api/facility-froms/{id}", facilityFrom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(facilityFrom.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFacilityFrom() throws Exception {
        // Get the facilityFrom
        restFacilityFromMockMvc.perform(get("/api/facility-froms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilityFrom() throws Exception {
        // Initialize the database
        facilityFromRepository.saveAndFlush(facilityFrom);
        int databaseSizeBeforeUpdate = facilityFromRepository.findAll().size();

        // Update the facilityFrom
        FacilityFrom updatedFacilityFrom = facilityFromRepository.findOne(facilityFrom.getId());
        // Disconnect from session so that the updates on updatedFacilityFrom are not directly saved in db
        em.detach(updatedFacilityFrom);
        FacilityFromDTO facilityFromDTO = facilityFromMapper.toDto(updatedFacilityFrom);

        restFacilityFromMockMvc.perform(put("/api/facility-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityFromDTO)))
            .andExpect(status().isOk());

        // Validate the FacilityFrom in the database
        List<FacilityFrom> facilityFromList = facilityFromRepository.findAll();
        assertThat(facilityFromList).hasSize(databaseSizeBeforeUpdate);
        FacilityFrom testFacilityFrom = facilityFromList.get(facilityFromList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilityFrom() throws Exception {
        int databaseSizeBeforeUpdate = facilityFromRepository.findAll().size();

        // Create the FacilityFrom
        FacilityFromDTO facilityFromDTO = facilityFromMapper.toDto(facilityFrom);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFacilityFromMockMvc.perform(put("/api/facility-froms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilityFromDTO)))
            .andExpect(status().isCreated());

        // Validate the FacilityFrom in the database
        List<FacilityFrom> facilityFromList = facilityFromRepository.findAll();
        assertThat(facilityFromList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFacilityFrom() throws Exception {
        // Initialize the database
        facilityFromRepository.saveAndFlush(facilityFrom);
        int databaseSizeBeforeDelete = facilityFromRepository.findAll().size();

        // Get the facilityFrom
        restFacilityFromMockMvc.perform(delete("/api/facility-froms/{id}", facilityFrom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FacilityFrom> facilityFromList = facilityFromRepository.findAll();
        assertThat(facilityFromList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityFrom.class);
        FacilityFrom facilityFrom1 = new FacilityFrom();
        facilityFrom1.setId(1L);
        FacilityFrom facilityFrom2 = new FacilityFrom();
        facilityFrom2.setId(facilityFrom1.getId());
        assertThat(facilityFrom1).isEqualTo(facilityFrom2);
        facilityFrom2.setId(2L);
        assertThat(facilityFrom1).isNotEqualTo(facilityFrom2);
        facilityFrom1.setId(null);
        assertThat(facilityFrom1).isNotEqualTo(facilityFrom2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityFromDTO.class);
        FacilityFromDTO facilityFromDTO1 = new FacilityFromDTO();
        facilityFromDTO1.setId(1L);
        FacilityFromDTO facilityFromDTO2 = new FacilityFromDTO();
        assertThat(facilityFromDTO1).isNotEqualTo(facilityFromDTO2);
        facilityFromDTO2.setId(facilityFromDTO1.getId());
        assertThat(facilityFromDTO1).isEqualTo(facilityFromDTO2);
        facilityFromDTO2.setId(2L);
        assertThat(facilityFromDTO1).isNotEqualTo(facilityFromDTO2);
        facilityFromDTO1.setId(null);
        assertThat(facilityFromDTO1).isNotEqualTo(facilityFromDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(facilityFromMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(facilityFromMapper.fromId(null)).isNull();
    }
}
