import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('FacilityDestination e2e test', () => {

    let navBarPage: NavBarPage;
    let facilityDestinationDialogPage: FacilityDestinationDialogPage;
    let facilityDestinationComponentsPage: FacilityDestinationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load FacilityDestinations', () => {
        navBarPage.goToEntity('facility-destination-my-suffix');
        facilityDestinationComponentsPage = new FacilityDestinationComponentsPage();
        expect(facilityDestinationComponentsPage.getTitle())
            .toMatch(/barkleyApp.facilityDestination.home.title/);

    });

    it('should load create FacilityDestination dialog', () => {
        facilityDestinationComponentsPage.clickOnCreateButton();
        facilityDestinationDialogPage = new FacilityDestinationDialogPage();
        expect(facilityDestinationDialogPage.getModalTitle())
            .toMatch(/barkleyApp.facilityDestination.home.createOrEditLabel/);
        facilityDestinationDialogPage.close();
    });

    it('should create and save FacilityDestinations', () => {
        facilityDestinationComponentsPage.clickOnCreateButton();
        facilityDestinationDialogPage.facilitySelectLastOption();
        facilityDestinationDialogPage.save();
        expect(facilityDestinationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FacilityDestinationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-facility-destination-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FacilityDestinationDialogPage {
    modalTitle = element(by.css('h4#myFacilityDestinationLabel'));
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
