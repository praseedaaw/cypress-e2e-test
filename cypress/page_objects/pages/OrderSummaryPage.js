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
    /**
    * Place Order button
    */
    placeOrderButton() {
        return this.getElement('button').contains('Place your order and pay');
    }

    // ============ Actions ============

    /**
     * Click Place Order button
     */
    clickPlaceOrder() {
        this.placeOrderButton().click();
    }

    // ============ Assertions ============

    /**
     * Verify Order Summary page is loaded
     */
    verifyPageLoaded() {
        this.verifyUrl(this.path);
        this.placeOrderButton().should('exist').and('not.be.disabled');
    }

    // ============ Navigation ============

    /**
     * Navigate to Order Summary page
     */
    visit() {
        super.visit(this.path);
    }
}

export default OrderSummaryPage;