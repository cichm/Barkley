package net.usermd.mcichon.web.rest;

import net.usermd.mcichon.BarkleyApp;

import net.usermd.mcichon.domain.CustomerAdditionalInfo;
import net.usermd.mcichon.repository.CustomerAdditionalInfoRepository;
import net.usermd.mcichon.service.CustomerAdditionalInfoService;
import net.usermd.mcichon.service.dto.CustomerAdditionalInfoDTO;
import net.usermd.mcichon.service.mapper.CustomerAdditionalInfoMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static net.usermd.mcichon.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CustomerAdditionalInfoResource REST controller.
 *
 * @see CustomerAdditionalInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarkleyApp.class)
public class CustomerAdditionalInfoResourceIntTest {

    private static final Instant DEFAULT_BIRTHDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BIRTHDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_STREET = "\"`\"Si";
    private static final String UPDATED_STREET = "\"l Pj";

    private static final String DEFAULT_HOUSENUM = "407";
    private static final String UPDATED_HOUSENUM = "8#5";

    private static final String DEFAULT_POSTAL_CODE = "77-465";
    private static final String UPDATED_POSTAL_CODE = "45-608";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    @Autowired
    private CustomerAdditionalInfoRepository customerAdditionalInfoRepository;

    @Autowired
    private CustomerAdditionalInfoMapper customerAdditionalInfoMapper;

    @Autowired
    private CustomerAdditionalInfoService customerAdditionalInfoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerAdditionalInfoMockMvc;

    private CustomerAdditionalInfo customerAdditionalInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerAdditionalInfoResource customerAdditionalInfoResource = new CustomerAdditionalInfoResource(customerAdditionalInfoService);
        this.restCustomerAdditionalInfoMockMvc = MockMvcBuilders.standaloneSetup(customerAdditionalInfoResource)
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
    public static CustomerAdditionalInfo createEntity(EntityManager em) {
        CustomerAdditionalInfo customerAdditionalInfo = new CustomerAdditionalInfo()
            .birthdate(DEFAULT_BIRTHDATE)
            .street(DEFAULT_STREET)
            .housenum(DEFAULT_HOUSENUM)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .isActive(DEFAULT_IS_ACTIVE);
        return customerAdditionalInfo;
    }

    @Before
    public void initTest() {
        customerAdditionalInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerAdditionalInfo() throws Exception {
        int databaseSizeBeforeCreate = customerAdditionalInfoRepository.findAll().size();

        // Create the CustomerAdditionalInfo
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = customerAdditionalInfoMapper.toDto(customerAdditionalInfo);
        restCustomerAdditionalInfoMockMvc.perform(post("/api/customer-additional-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerAdditionalInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerAdditionalInfo in the database
        List<CustomerAdditionalInfo> customerAdditionalInfoList = customerAdditionalInfoRepository.findAll();
        assertThat(customerAdditionalInfoList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerAdditionalInfo testCustomerAdditionalInfo = customerAdditionalInfoList.get(customerAdditionalInfoList.size() - 1);
        assertThat(testCustomerAdditionalInfo.getBirthdate()).isEqualTo(DEFAULT_BIRTHDATE);
        assertThat(testCustomerAdditionalInfo.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testCustomerAdditionalInfo.getHousenum()).isEqualTo(DEFAULT_HOUSENUM);
        assertThat(testCustomerAdditionalInfo.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testCustomerAdditionalInfo.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testCustomerAdditionalInfo.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void createCustomerAdditionalInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerAdditionalInfoRepository.findAll().size();

        // Create the CustomerAdditionalInfo with an existing ID
        customerAdditionalInfo.setId(1L);
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = customerAdditionalInfoMapper.toDto(customerAdditionalInfo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerAdditionalInfoMockMvc.perform(post("/api/customer-additional-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerAdditionalInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerAdditionalInfo in the database
        List<CustomerAdditionalInfo> customerAdditionalInfoList = customerAdditionalInfoRepository.findAll();
        assertThat(customerAdditionalInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIsActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerAdditionalInfoRepository.findAll().size();
        // set the field null
        customerAdditionalInfo.setIsActive(null);

        // Create the CustomerAdditionalInfo, which fails.
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = customerAdditionalInfoMapper.toDto(customerAdditionalInfo);

        restCustomerAdditionalInfoMockMvc.perform(post("/api/customer-additional-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerAdditionalInfoDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerAdditionalInfo> customerAdditionalInfoList = customerAdditionalInfoRepository.findAll();
        assertThat(customerAdditionalInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerAdditionalInfos() throws Exception {
        // Initialize the database
        customerAdditionalInfoRepository.saveAndFlush(customerAdditionalInfo);

        // Get all the customerAdditionalInfoList
        restCustomerAdditionalInfoMockMvc.perform(get("/api/customer-additional-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerAdditionalInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].birthdate").value(hasItem(DEFAULT_BIRTHDATE.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].housenum").value(hasItem(DEFAULT_HOUSENUM.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getCustomerAdditionalInfo() throws Exception {
        // Initialize the database
        customerAdditionalInfoRepository.saveAndFlush(customerAdditionalInfo);

        // Get the customerAdditionalInfo
        restCustomerAdditionalInfoMockMvc.perform(get("/api/customer-additional-infos/{id}", customerAdditionalInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerAdditionalInfo.getId().intValue()))
            .andExpect(jsonPath("$.birthdate").value(DEFAULT_BIRTHDATE.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.housenum").value(DEFAULT_HOUSENUM.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerAdditionalInfo() throws Exception {
        // Get the customerAdditionalInfo
        restCustomerAdditionalInfoMockMvc.perform(get("/api/customer-additional-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerAdditionalInfo() throws Exception {
        // Initialize the database
        customerAdditionalInfoRepository.saveAndFlush(customerAdditionalInfo);
        int databaseSizeBeforeUpdate = customerAdditionalInfoRepository.findAll().size();

        // Update the customerAdditionalInfo
        CustomerAdditionalInfo updatedCustomerAdditionalInfo = customerAdditionalInfoRepository.findOne(customerAdditionalInfo.getId());
        // Disconnect from session so that the updates on updatedCustomerAdditionalInfo are not directly saved in db
        em.detach(updatedCustomerAdditionalInfo);
        updatedCustomerAdditionalInfo
            .birthdate(UPDATED_BIRTHDATE)
            .street(UPDATED_STREET)
            .housenum(UPDATED_HOUSENUM)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .isActive(UPDATED_IS_ACTIVE);
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = customerAdditionalInfoMapper.toDto(updatedCustomerAdditionalInfo);

        restCustomerAdditionalInfoMockMvc.perform(put("/api/customer-additional-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerAdditionalInfoDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerAdditionalInfo in the database
        List<CustomerAdditionalInfo> customerAdditionalInfoList = customerAdditionalInfoRepository.findAll();
        assertThat(customerAdditionalInfoList).hasSize(databaseSizeBeforeUpdate);
        CustomerAdditionalInfo testCustomerAdditionalInfo = customerAdditionalInfoList.get(customerAdditionalInfoList.size() - 1);
        assertThat(testCustomerAdditionalInfo.getBirthdate()).isEqualTo(UPDATED_BIRTHDATE);
        assertThat(testCustomerAdditionalInfo.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testCustomerAdditionalInfo.getHousenum()).isEqualTo(UPDATED_HOUSENUM);
        assertThat(testCustomerAdditionalInfo.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testCustomerAdditionalInfo.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCustomerAdditionalInfo.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerAdditionalInfo() throws Exception {
        int databaseSizeBeforeUpdate = customerAdditionalInfoRepository.findAll().size();

        // Create the CustomerAdditionalInfo
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO = customerAdditionalInfoMapper.toDto(customerAdditionalInfo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomerAdditionalInfoMockMvc.perform(put("/api/customer-additional-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerAdditionalInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerAdditionalInfo in the database
        List<CustomerAdditionalInfo> customerAdditionalInfoList = customerAdditionalInfoRepository.findAll();
        assertThat(customerAdditionalInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustomerAdditionalInfo() throws Exception {
        // Initialize the database
        customerAdditionalInfoRepository.saveAndFlush(customerAdditionalInfo);
        int databaseSizeBeforeDelete = customerAdditionalInfoRepository.findAll().size();

        // Get the customerAdditionalInfo
        restCustomerAdditionalInfoMockMvc.perform(delete("/api/customer-additional-infos/{id}", customerAdditionalInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerAdditionalInfo> customerAdditionalInfoList = customerAdditionalInfoRepository.findAll();
        assertThat(customerAdditionalInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerAdditionalInfo.class);
        CustomerAdditionalInfo customerAdditionalInfo1 = new CustomerAdditionalInfo();
        customerAdditionalInfo1.setId(1L);
        CustomerAdditionalInfo customerAdditionalInfo2 = new CustomerAdditionalInfo();
        customerAdditionalInfo2.setId(customerAdditionalInfo1.getId());
        assertThat(customerAdditionalInfo1).isEqualTo(customerAdditionalInfo2);
        customerAdditionalInfo2.setId(2L);
        assertThat(customerAdditionalInfo1).isNotEqualTo(customerAdditionalInfo2);
        customerAdditionalInfo1.setId(null);
        assertThat(customerAdditionalInfo1).isNotEqualTo(customerAdditionalInfo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerAdditionalInfoDTO.class);
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO1 = new CustomerAdditionalInfoDTO();
        customerAdditionalInfoDTO1.setId(1L);
        CustomerAdditionalInfoDTO customerAdditionalInfoDTO2 = new CustomerAdditionalInfoDTO();
        assertThat(customerAdditionalInfoDTO1).isNotEqualTo(customerAdditionalInfoDTO2);
        customerAdditionalInfoDTO2.setId(customerAdditionalInfoDTO1.getId());
        assertThat(customerAdditionalInfoDTO1).isEqualTo(customerAdditionalInfoDTO2);
        customerAdditionalInfoDTO2.setId(2L);
        assertThat(customerAdditionalInfoDTO1).isNotEqualTo(customerAdditionalInfoDTO2);
        customerAdditionalInfoDTO1.setId(null);
        assertThat(customerAdditionalInfoDTO1).isNotEqualTo(customerAdditionalInfoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerAdditionalInfoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerAdditionalInfoMapper.fromId(null)).isNull();
    }
}
