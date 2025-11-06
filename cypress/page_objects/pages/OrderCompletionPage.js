/**
 * Page Object Model for OWASP Juice Shop Order Summary Page
 */
class OrderCompletionPage {
    // ============ Configuration ============
    CONFIG = {
        PAGE_PATH: '/#/order-completion/',
        TIMEOUTS: {
            PAGE_LOAD: 10000,
            ELEMENT_VISIBLE: 2000,
            NAVIGATION: 30000
        }
    };

    // ============ Element Selectors ============

    // Main Elements
    title() {
        return cy.get('h1.confirmation').contains('Thank you for your purchase!');
    }

    // ============ Actions ============

    // ============ Assertions ============

    verifyPageLoaded() {
        cy.url().should('include', this.CONFIG.PAGE_PATH);
        this.title().should('exist').and('not.be.disabled');
    }

    // ============ Navigation ============

    visit() {
      cy.visit(this.CONFIG.PAGE_PATH);
    }
}

export default OrderCompletionPage;