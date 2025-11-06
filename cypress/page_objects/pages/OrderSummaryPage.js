import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Order Summary Page
 */
class OrderSummaryPage extends BasePage {
    constructor() {
        super();
        this.path = '/#/order-summary';
    }

    // ============ Configuration ============
    CONFIG = {
        PAGE_PATH: '/#/order-summary',
        TIMEOUTS: {
            PAGE_LOAD: 10000,
            ELEMENT_VISIBLE: 2000,
            NAVIGATION: 30000
        }
    };

    // ============ Element Selectors ============

    // Main Elements
    placeOrderButton() {
        return cy.get('button').contains('Place your order and pay');
    }

    // ============ Actions ============

    clickPlaceOrder() {
        this.placeOrderButton().click();
    }

    // ============ Assertions ============

    verifyPageLoaded() {
        this.verifyUrl(this.path);
        this.placeOrderButton().should('exist').and('not.be.disabled');
    }

    // ============ Navigation ============

    visit() {
        super.visit(this.path);
    }
}

export default OrderSummaryPage;