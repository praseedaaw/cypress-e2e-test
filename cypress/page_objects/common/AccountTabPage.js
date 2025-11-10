import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Account Tab Page
 * This is a shared component that can be used across all pages
 */
class AccountTabPage extends BasePage {
    constructor() {
        super();
    }

    // ============ Element Selectors ============
    profileButton() {
        return this.getElement('#mat-menu-panel-0 button[aria-label="Go to user profile"] span.mat-mdc-menu-item-text');
    }

    orderAndPaymentButton() {
        return this.getElement('button[aria-label="Show Orders and Payment Menu"]');
    }

    orderHistoryButton() {
        return this.getElement('span.mat-mdc-menu-item-text span').contains('Order History');
    }

    privacyAndSecurityButton() {
        return this.getElement('#mat-menu-panel-0 button.mat-mdc-menu-item-highlighted span.mat-mdc-menu-item-text span');
    }

    // ============ Actions ============
    clickProfile() {
        this.profileButton().click();
    }

    clickOrderAndPayment() {
        this.orderAndPaymentButton().click();
    }

    clickOrderHistory() {
        this.clickOrderAndPayment();
        this.orderHistoryButton().click();
    }

    clickPrivacyAndSecurity() {
        this.privacyAndSecurityButton().click();
    }
}

export default AccountTabPage;