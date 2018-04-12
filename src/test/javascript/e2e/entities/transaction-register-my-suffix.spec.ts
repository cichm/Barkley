import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TransactionRegister e2e test', () => {

    let navBarPage: NavBarPage;
    let transactionRegisterDialogPage: TransactionRegisterDialogPage;
    let transactionRegisterComponentsPage: TransactionRegisterComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TransactionRegisters', () => {
        navBarPage.goToEntity('transaction-register-my-suffix');
        transactionRegisterComponentsPage = new TransactionRegisterComponentsPage();
        expect(transactionRegisterComponentsPage.getTitle())
            .toMatch(/barkleyApp.transactionRegister.home.title/);

    });

    it('should load create TransactionRegister dialog', () => {
        transactionRegisterComponentsPage.clickOnCreateButton();
        transactionRegisterDialogPage = new TransactionRegisterDialogPage();
        expect(transactionRegisterDialogPage.getModalTitle())
            .toMatch(/barkleyApp.transactionRegister.home.createOrEditLabel/);
        transactionRegisterDialogPage.close();
    });

    it('should create and save TransactionRegisters', () => {
        transactionRegisterComponentsPage.clickOnCreateButton();
        transactionRegisterDialogPage.setDateInput(12310020012301);
        expect(transactionRegisterDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        transactionRegisterDialogPage.setAmountInput('5');
        expect(transactionRegisterDialogPage.getAmountInput()).toMatch('5');
        transactionRegisterDialogPage.typeSelectLastOption();
        transactionRegisterDialogPage.fromSelectLastOption();
        transactionRegisterDialogPage.destinationSelectLastOption();
        transactionRegisterDialogPage.save();
        expect(transactionRegisterDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TransactionRegisterComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-transaction-register-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TransactionRegisterDialogPage {
    modalTitle = element(by.css('h4#myTransactionRegisterLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    amountInput = element(by.css('input#field_amount'));
    typeSelect = element(by.css('select#field_type'));
    fromSelect = element(by.css('select#field_from'));
    destinationSelect = element(by.css('select#field_destination'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    fromSelectLastOption = function() {
        this.fromSelect.all(by.tagName('option')).last().click();
    };

    fromSelectOption = function(option) {
        this.fromSelect.sendKeys(option);
    };

    getFromSelect = function() {
        return this.fromSelect;
    };

    getFromSelectedOption = function() {
        return this.fromSelect.element(by.css('option:checked')).getText();
    };

    destinationSelectLastOption = function() {
        this.destinationSelect.all(by.tagName('option')).last().click();
    };

    destinationSelectOption = function(option) {
        this.destinationSelect.sendKeys(option);
    };

    getDestinationSelect = function() {
        return this.destinationSelect;
    };

    getDestinationSelectedOption = function() {
        return this.destinationSelect.element(by.css('option:checked')).getText();
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
