import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('FacilityFrom e2e test', () => {

    let navBarPage: NavBarPage;
    let facilityFromDialogPage: FacilityFromDialogPage;
    let facilityFromComponentsPage: FacilityFromComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load FacilityFroms', () => {
        navBarPage.goToEntity('facility-from-my-suffix');
        facilityFromComponentsPage = new FacilityFromComponentsPage();
        expect(facilityFromComponentsPage.getTitle())
            .toMatch(/barkleyApp.facilityFrom.home.title/);

    });

    it('should load create FacilityFrom dialog', () => {
        facilityFromComponentsPage.clickOnCreateButton();
        facilityFromDialogPage = new FacilityFromDialogPage();
        expect(facilityFromDialogPage.getModalTitle())
            .toMatch(/barkleyApp.facilityFrom.home.createOrEditLabel/);
        facilityFromDialogPage.close();
    });

    it('should create and save FacilityFroms', () => {
        facilityFromComponentsPage.clickOnCreateButton();
        facilityFromDialogPage.facilitySelectLastOption();
        facilityFromDialogPage.save();
        expect(facilityFromDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FacilityFromComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-facility-from-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FacilityFromDialogPage {
    modalTitle = element(by.css('h4#myFacilityFromLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    facilitySelect = element(by.css('select#field_facility'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    facilitySelectLastOption = function() {
        this.facilitySelect.all(by.tagName('option')).last().click();
    };

    facilitySelectOption = function(option) {
        this.facilitySelect.sendKeys(option);
    };

    getFacilitySelect = function() {
        return this.facilitySelect;
    };

    getFacilitySelectedOption = function() {
        return this.facilitySelect.element(by.css('option:checked')).getText();
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
