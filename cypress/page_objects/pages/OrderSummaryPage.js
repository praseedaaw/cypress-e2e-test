import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Order Summary Page
 */
class OrderSummaryPage extends BasePage {
    constructor() {
        super();
        this.path = this.pageUrls.orderSummary;
    }

    // ============ Element Selectors ============

    // Main Elements
    placeOrderButton() {
        return this.getElement('button').contains('Place your order and pay');
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