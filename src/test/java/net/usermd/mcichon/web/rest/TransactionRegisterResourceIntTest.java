package net.usermd.mcichon.web.rest;

import net.usermd.mcichon.BarkleyApp;

import net.usermd.mcichon.domain.TransactionRegister;
import net.usermd.mcichon.repository.TransactionRegisterRepository;
import net.usermd.mcichon.service.TransactionRegisterService;
import net.usermd.mcichon.service.dto.TransactionRegisterDTO;
import net.usermd.mcichon.service.mapper.TransactionRegisterMapper;
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

import net.usermd.mcichon.domain.enumeration.TransactionType;
/**
 * Test class for the TransactionRegisterResource REST controller.
 *
 * @see TransactionRegisterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarkleyApp.class)
public class TransactionRegisterResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final TransactionType DEFAULT_TYPE = TransactionType.TRANSFER;
    private static final TransactionType UPDATED_TYPE = TransactionType.ATM_CASH_GET;

    @Autowired
    private TransactionRegisterRepository transactionRegisterRepository;

    @Autowired
    private TransactionRegisterMapper transactionRegisterMapper;

    @Autowired
    private TransactionRegisterService transactionRegisterService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransactionRegisterMockMvc;

    private TransactionRegister transactionRegister;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionRegisterResource transactionRegisterResource = new TransactionRegisterResource(transactionRegisterService);
        this.restTransactionRegisterMockMvc = MockMvcBuilders.standaloneSetup(transactionRegisterResource)
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
    public static TransactionRegister createEntity(EntityManager em) {
        TransactionRegister transactionRegister = new TransactionRegister()
            .date(DEFAULT_DATE)
            .amount(DEFAULT_AMOUNT)
            .type(DEFAULT_TYPE);
        return transactionRegister;
    }

    @Before
    public void initTest() {
        transactionRegister = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionRegister() throws Exception {
        int databaseSizeBeforeCreate = transactionRegisterRepository.findAll().size();

        // Create the TransactionRegister
        TransactionRegisterDTO transactionRegisterDTO = transactionRegisterMapper.toDto(transactionRegister);
        restTransactionRegisterMockMvc.perform(post("/api/transaction-registers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRegisterDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionRegister in the database
        List<TransactionRegister> transactionRegisterList = transactionRegisterRepository.findAll();
        assertThat(transactionRegisterList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionRegister testTransactionRegister = transactionRegisterList.get(transactionRegisterList.size() - 1);
        assertThat(testTransactionRegister.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTransactionRegister.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testTransactionRegister.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createTransactionRegisterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionRegisterRepository.findAll().size();

        // Create the TransactionRegister with an existing ID
        transactionRegister.setId(1L);
        TransactionRegisterDTO transactionRegisterDTO = transactionRegisterMapper.toDto(transactionRegister);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionRegisterMockMvc.perform(post("/api/transaction-registers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRegisterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionRegister in the database
        List<TransactionRegister> transactionRegisterList = transactionRegisterRepository.findAll();
        assertThat(transactionRegisterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionRegisterRepository.findAll().size();
        // set the field null
        transactionRegister.setAmount(null);

        // Create the TransactionRegister, which fails.
        TransactionRegisterDTO transactionRegisterDTO = transactionRegisterMapper.toDto(transactionRegister);

        restTransactionRegisterMockMvc.perform(post("/api/transaction-registers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRegisterDTO)))
            .andExpect(status().isBadRequest());

        List<TransactionRegister> transactionRegisterList = transactionRegisterRepository.findAll();
        assertThat(transactionRegisterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransactionRegisters() throws Exception {
        // Initialize the database
        transactionRegisterRepository.saveAndFlush(transactionRegister);

        // Get all the transactionRegisterList
        restTransactionRegisterMockMvc.perform(get("/api/transaction-registers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionRegister.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getTransactionRegister() throws Exception {
        // Initialize the database
        transactionRegisterRepository.saveAndFlush(transactionRegister);

        // Get the transactionRegister
        restTransactionRegisterMockMvc.perform(get("/api/transaction-registers/{id}", transactionRegister.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transactionRegister.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransactionRegister() throws Exception {
        // Get the transactionRegister
        restTransactionRegisterMockMvc.perform(get("/api/transaction-registers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionRegister() throws Exception {
        // Initialize the database
        transactionRegisterRepository.saveAndFlush(transactionRegister);
        int databaseSizeBeforeUpdate = transactionRegisterRepository.findAll().size();

        // Update the transactionRegister
        TransactionRegister updatedTransactionRegister = transactionRegisterRepository.findOne(transactionRegister.getId());
        // Disconnect from session so that the updates on updatedTransactionRegister are not directly saved in db
        em.detach(updatedTransactionRegister);
        updatedTransactionRegister
            .date(UPDATED_DATE)
            .amount(UPDATED_AMOUNT)
            .type(UPDATED_TYPE);
        TransactionRegisterDTO transactionRegisterDTO = transactionRegisterMapper.toDto(updatedTransactionRegister);

        restTransactionRegisterMockMvc.perform(put("/api/transaction-registers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRegisterDTO)))
            .andExpect(status().isOk());

        // Validate the TransactionRegister in the database
        List<TransactionRegister> transactionRegisterList = transactionRegisterRepository.findAll();
        assertThat(transactionRegisterList).hasSize(databaseSizeBeforeUpdate);
        TransactionRegister testTransactionRegister = transactionRegisterList.get(transactionRegisterList.size() - 1);
        assertThat(testTransactionRegister.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTransactionRegister.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTransactionRegister.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionRegister() throws Exception {
        int databaseSizeBeforeUpdate = transactionRegisterRepository.findAll().size();

        // Create the TransactionRegister
        TransactionRegisterDTO transactionRegisterDTO = transactionRegisterMapper.toDto(transactionRegister);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransactionRegisterMockMvc.perform(put("/api/transaction-registers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRegisterDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionRegister in the database
        List<TransactionRegister> transactionRegisterList = transactionRegisterRepository.findAll();
        assertThat(transactionRegisterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTransactionRegister() throws Exception {
        // Initialize the database
        transactionRegisterRepository.saveAndFlush(transactionRegister);
        int databaseSizeBeforeDelete = transactionRegisterRepository.findAll().size();

        // Get the transactionRegister
        restTransactionRegisterMockMvc.perform(delete("/api/transaction-registers/{id}", transactionRegister.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransactionRegister> transactionRegisterList = transactionRegisterRepository.findAll();
        assertThat(transactionRegisterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionRegister.class);
        TransactionRegister transactionRegister1 = new TransactionRegister();
        transactionRegister1.setId(1L);
        TransactionRegister transactionRegister2 = new TransactionRegister();
        transactionRegister2.setId(transactionRegister1.getId());
        assertThat(transactionRegister1).isEqualTo(transactionRegister2);
        transactionRegister2.setId(2L);
        assertThat(transactionRegister1).isNotEqualTo(transactionRegister2);
        transactionRegister1.setId(null);
        assertThat(transactionRegister1).isNotEqualTo(transactionRegister2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionRegisterDTO.class);
        TransactionRegisterDTO transactionRegisterDTO1 = new TransactionRegisterDTO();
        transactionRegisterDTO1.setId(1L);
        TransactionRegisterDTO transactionRegisterDTO2 = new TransactionRegisterDTO();
        assertThat(transactionRegisterDTO1).isNotEqualTo(transactionRegisterDTO2);
        transactionRegisterDTO2.setId(transactionRegisterDTO1.getId());
        assertThat(transactionRegisterDTO1).isEqualTo(transactionRegisterDTO2);
        transactionRegisterDTO2.setId(2L);
        assertThat(transactionRegisterDTO1).isNotEqualTo(transactionRegisterDTO2);
        transactionRegisterDTO1.setId(null);
        assertThat(transactionRegisterDTO1).isNotEqualTo(transactionRegisterDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transactionRegisterMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transactionRegisterMapper.fromId(null)).isNull();
    }
}
