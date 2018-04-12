package net.usermd.mcichon.web.rest;

import net.usermd.mcichon.BarkleyApp;

import net.usermd.mcichon.domain.MoneyAccount;
import net.usermd.mcichon.repository.MoneyAccountRepository;
import net.usermd.mcichon.service.MoneyAccountService;
import net.usermd.mcichon.service.dto.MoneyAccountDTO;
import net.usermd.mcichon.service.mapper.MoneyAccountMapper;
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

import net.usermd.mcichon.domain.enumeration.AccountType;
import net.usermd.mcichon.domain.enumeration.Currency;
/**
 * Test class for the MoneyAccountResource REST controller.
 *
 * @see MoneyAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarkleyApp.class)
public class MoneyAccountResourceIntTest {

    private static final AccountType DEFAULT_TYPE = AccountType.SIMPLE_ACCOUNT;
    private static final AccountType UPDATED_TYPE = AccountType.BUSINESS_ACCOUNT;

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final Currency DEFAULT_CURRENCY = Currency.PLN;
    private static final Currency UPDATED_CURRENCY = Currency.EUR;

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Double DEFAULT_SALDO = 1D;
    private static final Double UPDATED_SALDO = 2D;

    @Autowired
    private MoneyAccountRepository moneyAccountRepository;

    @Autowired
    private MoneyAccountMapper moneyAccountMapper;

    @Autowired
    private MoneyAccountService moneyAccountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMoneyAccountMockMvc;

    private MoneyAccount moneyAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MoneyAccountResource moneyAccountResource = new MoneyAccountResource(moneyAccountService);
        this.restMoneyAccountMockMvc = MockMvcBuilders.standaloneSetup(moneyAccountResource)
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
    public static MoneyAccount createEntity(EntityManager em) {
        MoneyAccount moneyAccount = new MoneyAccount()
            .type(DEFAULT_TYPE)
            .number(DEFAULT_NUMBER)
            .currency(DEFAULT_CURRENCY)
            .isActive(DEFAULT_IS_ACTIVE)
            .saldo(DEFAULT_SALDO);
        return moneyAccount;
    }

    @Before
    public void initTest() {
        moneyAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createMoneyAccount() throws Exception {
        int databaseSizeBeforeCreate = moneyAccountRepository.findAll().size();

        // Create the MoneyAccount
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(moneyAccount);
        restMoneyAccountMockMvc.perform(post("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isCreated());

        // Validate the MoneyAccount in the database
        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeCreate + 1);
        MoneyAccount testMoneyAccount = moneyAccountList.get(moneyAccountList.size() - 1);
        assertThat(testMoneyAccount.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMoneyAccount.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testMoneyAccount.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testMoneyAccount.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testMoneyAccount.getSaldo()).isEqualTo(DEFAULT_SALDO);
    }

    @Test
    @Transactional
    public void createMoneyAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moneyAccountRepository.findAll().size();

        // Create the MoneyAccount with an existing ID
        moneyAccount.setId(1L);
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(moneyAccount);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoneyAccountMockMvc.perform(post("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MoneyAccount in the database
        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyAccountRepository.findAll().size();
        // set the field null
        moneyAccount.setNumber(null);

        // Create the MoneyAccount, which fails.
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(moneyAccount);

        restMoneyAccountMockMvc.perform(post("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isBadRequest());

        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyAccountRepository.findAll().size();
        // set the field null
        moneyAccount.setIsActive(null);

        // Create the MoneyAccount, which fails.
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(moneyAccount);

        restMoneyAccountMockMvc.perform(post("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isBadRequest());

        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSaldoIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyAccountRepository.findAll().size();
        // set the field null
        moneyAccount.setSaldo(null);

        // Create the MoneyAccount, which fails.
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(moneyAccount);

        restMoneyAccountMockMvc.perform(post("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isBadRequest());

        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMoneyAccounts() throws Exception {
        // Initialize the database
        moneyAccountRepository.saveAndFlush(moneyAccount);

        // Get all the moneyAccountList
        restMoneyAccountMockMvc.perform(get("/api/money-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(moneyAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.doubleValue())));
    }

    @Test
    @Transactional
    public void getMoneyAccount() throws Exception {
        // Initialize the database
        moneyAccountRepository.saveAndFlush(moneyAccount);

        // Get the moneyAccount
        restMoneyAccountMockMvc.perform(get("/api/money-accounts/{id}", moneyAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(moneyAccount.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.saldo").value(DEFAULT_SALDO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMoneyAccount() throws Exception {
        // Get the moneyAccount
        restMoneyAccountMockMvc.perform(get("/api/money-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMoneyAccount() throws Exception {
        // Initialize the database
        moneyAccountRepository.saveAndFlush(moneyAccount);
        int databaseSizeBeforeUpdate = moneyAccountRepository.findAll().size();

        // Update the moneyAccount
        MoneyAccount updatedMoneyAccount = moneyAccountRepository.findOne(moneyAccount.getId());
        // Disconnect from session so that the updates on updatedMoneyAccount are not directly saved in db
        em.detach(updatedMoneyAccount);
        updatedMoneyAccount
            .type(UPDATED_TYPE)
            .number(UPDATED_NUMBER)
            .currency(UPDATED_CURRENCY)
            .isActive(UPDATED_IS_ACTIVE)
            .saldo(UPDATED_SALDO);
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(updatedMoneyAccount);

        restMoneyAccountMockMvc.perform(put("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isOk());

        // Validate the MoneyAccount in the database
        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeUpdate);
        MoneyAccount testMoneyAccount = moneyAccountList.get(moneyAccountList.size() - 1);
        assertThat(testMoneyAccount.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMoneyAccount.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testMoneyAccount.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testMoneyAccount.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testMoneyAccount.getSaldo()).isEqualTo(UPDATED_SALDO);
    }

    @Test
    @Transactional
    public void updateNonExistingMoneyAccount() throws Exception {
        int databaseSizeBeforeUpdate = moneyAccountRepository.findAll().size();

        // Create the MoneyAccount
        MoneyAccountDTO moneyAccountDTO = moneyAccountMapper.toDto(moneyAccount);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMoneyAccountMockMvc.perform(put("/api/money-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moneyAccountDTO)))
            .andExpect(status().isCreated());

        // Validate the MoneyAccount in the database
        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMoneyAccount() throws Exception {
        // Initialize the database
        moneyAccountRepository.saveAndFlush(moneyAccount);
        int databaseSizeBeforeDelete = moneyAccountRepository.findAll().size();

        // Get the moneyAccount
        restMoneyAccountMockMvc.perform(delete("/api/money-accounts/{id}", moneyAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MoneyAccount> moneyAccountList = moneyAccountRepository.findAll();
        assertThat(moneyAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MoneyAccount.class);
        MoneyAccount moneyAccount1 = new MoneyAccount();
        moneyAccount1.setId(1L);
        MoneyAccount moneyAccount2 = new MoneyAccount();
        moneyAccount2.setId(moneyAccount1.getId());
        assertThat(moneyAccount1).isEqualTo(moneyAccount2);
        moneyAccount2.setId(2L);
        assertThat(moneyAccount1).isNotEqualTo(moneyAccount2);
        moneyAccount1.setId(null);
        assertThat(moneyAccount1).isNotEqualTo(moneyAccount2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MoneyAccountDTO.class);
        MoneyAccountDTO moneyAccountDTO1 = new MoneyAccountDTO();
        moneyAccountDTO1.setId(1L);
        MoneyAccountDTO moneyAccountDTO2 = new MoneyAccountDTO();
        assertThat(moneyAccountDTO1).isNotEqualTo(moneyAccountDTO2);
        moneyAccountDTO2.setId(moneyAccountDTO1.getId());
        assertThat(moneyAccountDTO1).isEqualTo(moneyAccountDTO2);
        moneyAccountDTO2.setId(2L);
        assertThat(moneyAccountDTO1).isNotEqualTo(moneyAccountDTO2);
        moneyAccountDTO1.setId(null);
        assertThat(moneyAccountDTO1).isNotEqualTo(moneyAccountDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(moneyAccountMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(moneyAccountMapper.fromId(null)).isNull();
    }
}
