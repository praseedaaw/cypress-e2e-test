import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Home Page
 */
class HomePage extends BasePage {
  // ============ Configuration ============
  constructor() {
    super();
    this.path = '/#/';
    this.CONFIG = {
      PAGE_PATH: '/#/',
      TIMEOUTS: {
        PAGE_LOAD: 10000,
        ELEMENT_VISIBLE: 2000,
        NAVIGATION: 30000
      }
    };
  }

  // ============ Element Selectors ============

  // Product elements
  productElement(index) {
    return cy.get(`div.mat-grid-tile:nth-child(${index + 1}) mat-card.mat-mdc-card.mdc-card div.mdc-card div.product img.mat-mdc-card-image.mdc-card__media`);
  }

  // Add to basket buttons
  addToBasketButton(index) {
    return cy.get(`mat-grid-tile:nth-child(${index + 1}) button[aria-label="Add to Basket"]`);
  }

  // Page navigation
  previousPageButton() {
    return cy.contains('button', 'Previous page');
  }

  nextPageButton() {
    return cy.contains('button', 'Next page');
  }

  itemsPerPageDropdown() {
    return cy.get('select[aria-label="Items per page"]');
  }

  // ============ Actions ============

  /**
   * Navigate to home page
   */
  visit() {
    super.visit(this.path);
  }

  /**
   * Click product element by index
   * @param {number} index - Product index
   */
  clickProduct(index) {
    this.productElement(index).click();
  }

  /**
   * Add product to basket by index
   * @param {number} index - Product index
   */
  addToBasket(index) {
    this.addToBasketButton(index).click();
  }

  /**
   * Click previous page button
   */
  clickPreviousPage() {
    this.previousPageButton().click();
  }

  /**
   * Click next page button
   */
  clickNextPage() {
    this.nextPageButton().click();
  }

  /**
   * Select items per page
   * @param {string} value - Number of items per page
   */
  selectItemsPerPage(value) {
    this.itemsPerPageDropdown().select(value);
  }

  // ============ Assertions ============

  /**
   * Verify page has loaded successfully
   */
  verifyPageLoaded() {
    this.verifyUrl(this.path);
  }

  /**
   * Verify navigation buttons are visible
   */
  verifyNavigationButtonsVisible() {
    this.previousPageButton().should('exist');
    this.nextPageButton().should('exist');
  }

  /**
   * Verify specific product is visible
   * @param {number} index - Product index
   */
  verifyProductVisible(index) {
    this.productElement(index).should('be.visible');
    this.addToBasketButton(index).should('be.visible');
  }
}

export default HomePage;