import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Checkout Page
 */
class CheckoutPage extends BasePage {
  constructor() {
    super();
    this.path = '/#/basket';
  }

  // ============ Element Selectors ============

  /**
   * Get increase quantity button for an item
   * @param {number} index - Index of the item (0-based)
   */
  increaseQuantityButton(index) {
    return cy.get(`mat-row:nth-child(${index + 1}) button:nth-child(3) span.mat-mdc-button-touch-target`);
  }

  /**
   * Get decrease quantity button for an item
   * @param {number} index - Index of the item (0-based)
   */
  decreaseQuantityButton(index) {
    return cy.get(`mat-row:nth-child(${index + 1}) mat-cell.mat-column-quantity button:nth-child(1) span.mat-mdc-button-touch-target`);
  }

  /**
   * Get remove item button
   * @param {number} index - Index of the item (0-based)
   */
  removeItemButton(index) {
    // First check if the row exists to prevent timeout
    return cy.get('mat-row').eq(index).then($row => {
      if ($row.length) {
        return cy.wrap($row).find('mat-cell.mat-column-remove button.mat-unthemed span.mat-mdc-button-touch-target');
      }
      return null;
    });
  }

  /**
   * Get checkout button
   */
  checkoutButton() {
    return cy.get('#checkoutButton');
  }

  // ============ Actions ============

  /**
   * Navigate to checkout page
   */
  visit() {
    super.visit(this.path);
  }

  /**
   * Check if basket has items safely without throwing errors
   * @returns {Cypress.Chainable<boolean>}
   */
  hasItems() {
    return cy.get('body').then($body => {
      return Cypress.$('mat-row', $body).length > 0;
    });
  }

  /**
   * Increase the quantity of an item
   * @param {number} index - Index of the item (0-based)
   */
  increaseQuantity(index) {
    this.hasItems().then(hasItems => {
      if (hasItems) {
        this.increaseQuantityButton(index).click();
      }
      // If no items, just continue
    });
  }

  /**
   * Decrease the quantity of an item
   * @param {number} index - Index of the item (0-based)
   */
  decreaseQuantity(index) {
    this.hasItems().then(hasItems => {
      if (hasItems) {
        this.decreaseQuantityButton(index).click();
      }
      // If no items, just continue
    });
  }

  /**
   * Remove an item from the basket
   * @param {number} index - Index of the item (0-based)
   */
  removeItem(index) {
    // Use existence check with timeout
    cy.get('body').then($body => {
      const hasRows = Cypress.$('mat-row', $body).length > 0;
      if (hasRows) {
        cy.get('mat-row').eq(index).within(() => {
          cy.get('mat-cell.mat-column-remove button.mat-unthemed span.mat-mdc-button-touch-target')
            .click({ force: true });
        });
      }
    });
  }

  /**
   * Remove first item from the basket
   */
  removeFirstItem() {
    this.hasItems().then(hasItems => {
      if (hasItems) {
        this.removeItem(0);
      }
    });
  }

  /**
   * Clear basket if not empty
   */
  clearBasketIfNotEmpty() {
    this.hasItems().then(hasItems => {
      if (hasItems) {
        // Get all rows and remove them one by one
        cy.get('mat-row').each(() => {
          // Always remove the first item as they shift up
          this.removeFirstItem();
          // Add small delay between removals
          cy.wait(500);
        });
      }
    });
  }

  /**
   * Click the checkout button
   */
  proceedToCheckout() {
    this.checkoutButton().click({force: true});
  }

  // ============ Assertions ============

  /**
   * Verify page has loaded successfully
   */
  verifyPageLoaded() {
    this.verifyUrl(this.path);
  }

  /**
   * Verify a specific item is in the basket
   * @param {number} index - Index of the item (0-based)
   */
  verifyItemExists(index) {
    cy.get(`mat-row:nth-child(${index + 1})`).should('exist');
  }

  /**
   * Verify checkout button is enabled
   */
  verifyCheckoutEnabled() {
    this.checkoutButton().should('be.enabled');
  }
}

export default CheckoutPage;