import BasePage from '../BasePage';

/**
 * Page Object Model for handling common dialogs in OWASP Juice Shop
 */
class CommonDialogsPage extends BasePage {
    constructor() {
        super();
    }

    // ============ Element Selectors ============
    cookieConsentButton() {
        return this.getElement('a.cc-btn');
    }

    welcomeDialog() {
        return this.getElement('#mat-mdc-dialog-0');
    }

    welcomeDialogCloseButton() {
        return this.getElement('#mat-mdc-dialog-0 span.hide-lt-sm');
    }

    // ============ Actions ============
    closeCookieConsent() {
        cy.get('body').then($body => {
            if ($body.find('a.cc-btn').length > 0) {
                this.cookieConsentButton()
                    .should('be.visible')
                    .click();
            }
        });
    }

    closeWelcomeDialog() {
        cy.get('body').then($body => {
            if ($body.find('#mat-mdc-dialog-0').length > 0) {
                this.welcomeDialogCloseButton()
                    .should('be.visible')
                    .click();
            }
        });
    }

    handleInitialDialogs() {
        this.closeCookieConsent();
        this.closeWelcomeDialog();
    }
}

export default CommonDialogsPage;