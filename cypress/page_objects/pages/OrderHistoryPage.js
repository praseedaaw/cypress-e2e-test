import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Order History Page
 */
class OrderHistoryPage extends BasePage {
    constructor() {
        super();
        this.path = this.pageUrls.orderHistory;
    }

    // ============ Element Selectors ============

    // Title element
    title() {
        return this.getElement('mat-card-title.mat-mdc-card-title').contains('Order History');
    }

    // Order element by index
    order(index) {
        return this.getElement(`div:nth-child(${index}) > div.custom-slate > div.heading`);
    }

    // Order ID element by index
    orderID(index) {
        return this.getElement(`div:nth-child(${index}) > div.custom-slate > div.heading > div.heading-row > div.col-40 > div:nth-child(2)`);
    }

    // ============ Actions ============

    /**
     * Click Title
     */
    clickTitle() {
        this.title().click();
    }

    /**
     * Click Order by index
     */
    clickOrder(index) {
        this.order(index).click();
    }

    /**
     * Click Order ID by index
     */
    clickOrderID(index) {
        this.orderID(index).click();
    }

    // ============ Assertions ============

    /**
     * Verify Order History page is loaded
     */
    verifyPageLoaded() {
        this.verifyUrl(this.path);
        this.title().should('be.visible');
    }

    /**
     * Verify order and order ID are visible
     */
    verifyOrderVisible(index) {
        this.order(index).should('be.visible');
    }

    /**
     * Verify order ID is visible
     */
    verifyOrderIDVisible(index) {
        this.orderID(index).should('be.visible');
    }

    // ============ Navigation ============

    /**
     * Navigate to Order History page
     */
    visit() {
        super.visit(this.path);
    }
}

export default OrderHistoryPage;