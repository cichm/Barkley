import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer-my-suffix');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle())
            .toMatch(/barkleyApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle())
            .toMatch(/barkleyApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setFirstNameInput('firstName');
        expect(customerDialogPage.getFirstNameInput()).toMatch('firstName');
        customerDialogPage.setLastNameInput('lastName');
        expect(customerDialogPage.getLastNameInput()).toMatch('lastName');
        customerDialogPage.setDocumentInput('document');
        expect(customerDialogPage.getDocumentInput()).toMatch('document');
        customerDialogPage.setPeselInput('pesel');
        expect(customerDialogPage.getPeselInput()).toMatch('pesel');
        customerDialogPage.setPhoneNumberInput('phoneNumber');
        expect(customerDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        customerDialogPage.setEmailInput('email');
        expect(customerDialogPage.getEmailInput()).toMatch('email');
        customerDialogPage.aditionalInfoSelectLastOption();
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    documentInput = element(by.css('input#field_document'));
    peselInput = element(by.css('input#field_pesel'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    emailInput = element(by.css('input#field_email'));
    aditionalInfoSelect = element(by.css('select#field_aditionalInfo'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    };

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    };

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    };

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    };

    setDocumentInput = function(document) {
        this.documentInput.sendKeys(document);
    };

    getDocumentInput = function() {
        return this.documentInput.getAttribute('value');
    };

    setPeselInput = function(pesel) {
        this.peselInput.sendKeys(pesel);
    };

    getPeselInput = function() {
        return this.peselInput.getAttribute('value');
    };

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    aditionalInfoSelectLastOption = function() {
        this.aditionalInfoSelect.all(by.tagName('option')).last().click();
    };

    aditionalInfoSelectOption = function(option) {
        this.aditionalInfoSelect.sendKeys(option);
    };

    getAditionalInfoSelect = function() {
        return this.aditionalInfoSelect;
    };

    getAditionalInfoSelectedOption = function() {
        return this.aditionalInfoSelect.element(by.css('option:checked')).getText();
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
