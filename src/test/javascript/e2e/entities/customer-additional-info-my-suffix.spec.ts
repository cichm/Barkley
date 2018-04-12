import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CustomerAdditionalInfo e2e test', () => {

    let navBarPage: NavBarPage;
    let customerAdditionalInfoDialogPage: CustomerAdditionalInfoDialogPage;
    let customerAdditionalInfoComponentsPage: CustomerAdditionalInfoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CustomerAdditionalInfos', () => {
        navBarPage.goToEntity('customer-additional-info-my-suffix');
        customerAdditionalInfoComponentsPage = new CustomerAdditionalInfoComponentsPage();
        expect(customerAdditionalInfoComponentsPage.getTitle())
            .toMatch(/barkleyApp.customerAdditionalInfo.home.title/);

    });

    it('should load create CustomerAdditionalInfo dialog', () => {
        customerAdditionalInfoComponentsPage.clickOnCreateButton();
        customerAdditionalInfoDialogPage = new CustomerAdditionalInfoDialogPage();
        expect(customerAdditionalInfoDialogPage.getModalTitle())
            .toMatch(/barkleyApp.customerAdditionalInfo.home.createOrEditLabel/);
        customerAdditionalInfoDialogPage.close();
    });

    it('should create and save CustomerAdditionalInfos', () => {
        customerAdditionalInfoComponentsPage.clickOnCreateButton();
        customerAdditionalInfoDialogPage.setBirthdateInput(12310020012301);
        expect(customerAdditionalInfoDialogPage.getBirthdateInput()).toMatch('2001-12-31T02:30');
        customerAdditionalInfoDialogPage.setStreetInput('street');
        expect(customerAdditionalInfoDialogPage.getStreetInput()).toMatch('street');
        customerAdditionalInfoDialogPage.setHousenumInput('housenum');
        expect(customerAdditionalInfoDialogPage.getHousenumInput()).toMatch('housenum');
        customerAdditionalInfoDialogPage.setPostalCodeInput('postalCode');
        expect(customerAdditionalInfoDialogPage.getPostalCodeInput()).toMatch('postalCode');
        customerAdditionalInfoDialogPage.setCityInput('city');
        expect(customerAdditionalInfoDialogPage.getCityInput()).toMatch('city');
        customerAdditionalInfoDialogPage.getIsActiveInput().isSelected().then((selected) => {
            if (selected) {
                customerAdditionalInfoDialogPage.getIsActiveInput().click();
                expect(customerAdditionalInfoDialogPage.getIsActiveInput().isSelected()).toBeFalsy();
            } else {
                customerAdditionalInfoDialogPage.getIsActiveInput().click();
                expect(customerAdditionalInfoDialogPage.getIsActiveInput().isSelected()).toBeTruthy();
            }
        });
        customerAdditionalInfoDialogPage.save();
        expect(customerAdditionalInfoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerAdditionalInfoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-additional-info-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerAdditionalInfoDialogPage {
    modalTitle = element(by.css('h4#myCustomerAdditionalInfoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    birthdateInput = element(by.css('input#field_birthdate'));
    streetInput = element(by.css('input#field_street'));
    housenumInput = element(by.css('input#field_housenum'));
    postalCodeInput = element(by.css('input#field_postalCode'));
    cityInput = element(by.css('input#field_city'));
    isActiveInput = element(by.css('input#field_isActive'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBirthdateInput = function(birthdate) {
        this.birthdateInput.sendKeys(birthdate);
    };

    getBirthdateInput = function() {
        return this.birthdateInput.getAttribute('value');
    };

    setStreetInput = function(street) {
        this.streetInput.sendKeys(street);
    };

    getStreetInput = function() {
        return this.streetInput.getAttribute('value');
    };

    setHousenumInput = function(housenum) {
        this.housenumInput.sendKeys(housenum);
    };

    getHousenumInput = function() {
        return this.housenumInput.getAttribute('value');
    };

    setPostalCodeInput = function(postalCode) {
        this.postalCodeInput.sendKeys(postalCode);
    };

    getPostalCodeInput = function() {
        return this.postalCodeInput.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    getIsActiveInput = function() {
        return this.isActiveInput;
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
