import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Order History Page
 */
class OrderHistoryPage extends BasePage {
    constructor() {
        super();
        this.path = '/#/order-history';
    }

    // ============ Element Selectors ============

    title() {
        return cy.get('mat-card-title.mat-mdc-card-title').contains('Order History');
    }

    order(index) {
        return cy.get(`div:nth-child(${index}) > div.custom-slate > div.heading`);
    }

    orderID(index) {
        return cy.get(`div:nth-child(${index}) > div.custom-slate > div.heading > div.heading-row > div.col-40 > div:nth-child(2)`);
    }

    // ============ Actions ============

    clickTitle() {
        this.title().click();
    }

    clickOrder(index) {
        this.order(index).click();
    }

    clickOrderID(index) {
        this.orderID(index).click();
    }

    // ============ Assertions ============

    verifyPageLoaded() {
        this.verifyUrl(this.path);
        this.title().should('be.visible');
    }

    verifyOrderVisible(index) {
        this.order(index).should('be.visible');
    }

    verifyOrderIDVisible(index) {
        this.orderID(index).should('be.visible');
    }

    // ============ Navigation ============

    visit() {
        super.visit(this.path);
    }
}

export default OrderHistoryPage;