import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('MoneyAccount e2e test', () => {

    let navBarPage: NavBarPage;
    let moneyAccountDialogPage: MoneyAccountDialogPage;
    let moneyAccountComponentsPage: MoneyAccountComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MoneyAccounts', () => {
        navBarPage.goToEntity('money-account-my-suffix');
        moneyAccountComponentsPage = new MoneyAccountComponentsPage();
        expect(moneyAccountComponentsPage.getTitle())
            .toMatch(/barkleyApp.moneyAccount.home.title/);

    });

    it('should load create MoneyAccount dialog', () => {
        moneyAccountComponentsPage.clickOnCreateButton();
        moneyAccountDialogPage = new MoneyAccountDialogPage();
        expect(moneyAccountDialogPage.getModalTitle())
            .toMatch(/barkleyApp.moneyAccount.home.createOrEditLabel/);
        moneyAccountDialogPage.close();
    });

    it('should create and save MoneyAccounts', () => {
        moneyAccountComponentsPage.clickOnCreateButton();
        moneyAccountDialogPage.typeSelectLastOption();
        moneyAccountDialogPage.setNumberInput('number');
        expect(moneyAccountDialogPage.getNumberInput()).toMatch('number');
        moneyAccountDialogPage.currencySelectLastOption();
        moneyAccountDialogPage.getIsActiveInput().isSelected().then((selected) => {
            if (selected) {
                moneyAccountDialogPage.getIsActiveInput().click();
                expect(moneyAccountDialogPage.getIsActiveInput().isSelected()).toBeFalsy();
            } else {
                moneyAccountDialogPage.getIsActiveInput().click();
                expect(moneyAccountDialogPage.getIsActiveInput().isSelected()).toBeTruthy();
            }
        });
        moneyAccountDialogPage.setSaldoInput('5');
        expect(moneyAccountDialogPage.getSaldoInput()).toMatch('5');
        moneyAccountDialogPage.customerSelectLastOption();
        moneyAccountDialogPage.save();
        expect(moneyAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MoneyAccountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-money-account-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MoneyAccountDialogPage {
    modalTitle = element(by.css('h4#myMoneyAccountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    typeSelect = element(by.css('select#field_type'));
    numberInput = element(by.css('input#field_number'));
    currencySelect = element(by.css('select#field_currency'));
    isActiveInput = element(by.css('input#field_isActive'));
    saldoInput = element(by.css('input#field_saldo'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    setNumberInput = function(number) {
        this.numberInput.sendKeys(number);
    };

    getNumberInput = function() {
        return this.numberInput.getAttribute('value');
    };

    setCurrencySelect = function(currency) {
        this.currencySelect.sendKeys(currency);
    };

    getCurrencySelect = function() {
        return this.currencySelect.element(by.css('option:checked')).getText();
    };

    currencySelectLastOption = function() {
        this.currencySelect.all(by.tagName('option')).last().click();
    };
    getIsActiveInput = function() {
        return this.isActiveInput;
    };
    setSaldoInput = function(saldo) {
        this.saldoInput.sendKeys(saldo);
    };

    getSaldoInput = function() {
        return this.saldoInput.getAttribute('value');
    };

    customerSelectLastOption = function() {
        this.customerSelect.all(by.tagName('option')).last().click();
    };

    customerSelectOption = function(option) {
        this.customerSelect.sendKeys(option);
    };

    getCustomerSelect = function() {
        return this.customerSelect;
    };

    getCustomerSelectedOption = function() {
        return this.customerSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
