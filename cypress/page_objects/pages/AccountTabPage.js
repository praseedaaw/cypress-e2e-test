/**
 * Page Object Model for OWASP Juice Shop Account Tab Page
 */
class AccountTabPage {
    // ============ Configuration ============
    CONFIG = {
        TIMEOUTS: {
            ELEMENT_VISIBLE: 2000
        }
    };

    // ============ Element Selectors ============

    profileButton() {
        return cy.get('#mat-menu-panel-0 button[aria-label="Go to user profile"] span.mat-mdc-menu-item-text');
    }

    orderAndPaymentButton() {
        return cy.get('button[aria-label="Show Orders and Payment Menu"]');
    }

    orderHistoryButton() {
        return cy.contains('span.mat-mdc-menu-item-text span', 'Order History');
    }

    privacyAndSecurityButton() {
        return cy.get('#mat-menu-panel-0 button.mat-mdc-menu-item-highlighted span.mat-mdc-menu-item-text span');
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