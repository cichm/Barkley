import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Card e2e test', () => {

    let navBarPage: NavBarPage;
    let cardDialogPage: CardDialogPage;
    let cardComponentsPage: CardComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cards', () => {
        navBarPage.goToEntity('card-my-suffix');
        cardComponentsPage = new CardComponentsPage();
        expect(cardComponentsPage.getTitle())
            .toMatch(/barkleyApp.card.home.title/);

    });

    it('should load create Card dialog', () => {
        cardComponentsPage.clickOnCreateButton();
        cardDialogPage = new CardDialogPage();
        expect(cardDialogPage.getModalTitle())
            .toMatch(/barkleyApp.card.home.createOrEditLabel/);
        cardDialogPage.close();
    });

    it('should create and save Cards', () => {
        cardComponentsPage.clickOnCreateButton();
        cardDialogPage.typeSelectLastOption();
        cardDialogPage.setNumberInput('number');
        expect(cardDialogPage.getNumberInput()).toMatch('number');
        cardDialogPage.setValidInput('valid');
        expect(cardDialogPage.getValidInput()).toMatch('valid');
        cardDialogPage.moneyAccountSelectLastOption();
        cardDialogPage.save();
        expect(cardDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CardComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-card-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CardDialogPage {
    modalTitle = element(by.css('h4#myCardLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    typeSelect = element(by.css('select#field_type'));
    numberInput = element(by.css('input#field_number'));
    validInput = element(by.css('input#field_valid'));
    moneyAccountSelect = element(by.css('select#field_moneyAccount'));

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

    setValidInput = function(valid) {
        this.validInput.sendKeys(valid);
    };

    getValidInput = function() {
        return this.validInput.getAttribute('value');
    };

    moneyAccountSelectLastOption = function() {
        this.moneyAccountSelect.all(by.tagName('option')).last().click();
    };

    moneyAccountSelectOption = function(option) {
        this.moneyAccountSelect.sendKeys(option);
    };

    getMoneyAccountSelect = function() {
        return this.moneyAccountSelect;
    };

    getMoneyAccountSelectedOption = function() {
        return this.moneyAccountSelect.element(by.css('option:checked')).getText();
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
