import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Order Completion Page
 */
class OrderCompletionPage extends BasePage {
    constructor() {
        super();
        this.path = this.pageUrls.orderCompletion;
    }

    // ============ Element Selectors ============
    // Title element
    title() {
        return this.getElement('h1.confirmation').contains('Thank you for your purchase!');
    }

    // ============ Actions ============
    /**
     * Navigate to Order Completion page
     */
    visit() {
        super.visit(this.path);
    }

    // ============ Assertions ============
    
    /**
     * Verify Order Completion page is loaded
     */
    verifyPageLoaded() {
        this.verifyUrl(this.path);
        this.title().should('exist').and('not.be.disabled');
    }
}

export default OrderCompletionPage;