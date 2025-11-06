/**
 * Page Object Model for OWASP Juice Shop top navigation bar
 */
class TopNavigationPage {
  // ============ Configuration ============
  constructor() {
    this.CONFIG = {
      PAGE_PATH: '/',
      TIMEOUTS: {
        PAGE_LOAD: 10000,
        ELEMENT_VISIBLE: 2000,
        NAVIGATION: 30000
      }
    };
  }

  // ============ Modal Elements ============

  // Cookie consent message
  cookieConsentMessage() {
    return cy.get('#cookieconsent\\:desc');
  }

  // ============ Main Elements ============

  // Menu button
  menuButton() {
    return cy.get('[aria-label="Open Sidenav"]');
  }

  // Back to homepage button
  owaspJuiceShopButton() {
    return cy.contains('Back to homepage');
  }

  // Account button
  accountButton() {
    return cy.get('[aria-label="Show/hide account menu"]');
  }

  // Shopping cart button
  shoppingCartButton() {
    return cy.get('[aria-label="Show the shopping cart"]');
  }

  // Language selection button
  languageButton() {
    return cy.get('[aria-label="Language selection menu"]');
  }

  // ============ Actions ============

  /**
   * Navigate to home page
   */
  visit() {
    cy.visit(this.CONFIG.PAGE_PATH);
  }

  /**
   * Click menu button
   */
  clickMenu() {
    this.menuButton().click();
  }

  /**
   * Click OWASP Juice Shop button
   */
  clickOwaspJuiceShop() {
    this.owaspJuiceShopButton().click();
  }

  /**
   * Click account button
   */
  clickAccount() {
    this.accountButton().click();
  }

  /**
   * Click shopping cart button
   */
  clickShoppingCart() {
    this.shoppingCartButton().click();
  }

  /**
   * Click language button
   */
  clickLanguage() {
    this.languageButton().click();
  }

  /**
   * Select options from navigation
   * @param {('account'|'language')} option - Option to select
   */
  selectOption(option) {
    const optionMap = {
      'account': () => this.clickAccount(),
      'language': () => this.clickLanguage()
    };

    const action = optionMap[option];
    if (!action) {
      throw new Error(`Invalid option: ${option}. Must be one of: account, language`);
    }
    action();
  }

  // ============ Assertions ============

  /**
   * Verify page has loaded successfully
   */
  verifyPageLoaded() {
    cy.url().should('include', this.CONFIG.PAGE_PATH);
    this.cookieConsentMessage().should('be.visible');
  }

  /**
   * Verify all navigation buttons are visible
   */
  verifyAllButtonsVisible() {
    this.menuButton().should('be.visible');
    this.owaspJuiceShopButton().should('be.visible');
    this.accountButton().should('be.visible');
    this.shoppingCartButton().should('be.visible');
    this.languageButton().should('be.visible');
  }

  /**
   * Verify a specific element is visible
   * @param {string} element - Element name to check
   */
  verifyElementVisible(element) {
    const elementMap = {
      'menu': () => this.menuButton(),
      'home': () => this.owaspJuiceShopButton(),
      'account': () => this.accountButton(),
      'cart': () => this.shoppingCartButton(),
      'language': () => this.languageButton(),
      'cookie': () => this.cookieConsentMessage()
    };

    const getElement = elementMap[element];
    if (!getElement) {
      throw new Error(`Invalid element: ${element}`);
    }
    getElement().should('be.visible');
  }

  /**
   * Check if an element is visible
   * @param {string} element - Element name to check
   * @returns {Cypress.Chainable<boolean>}
   */
  isElementVisible(element) {
    const elementMap = {
      'menu': () => this.menuButton(),
      'home': () => this.owaspJuiceShopButton(),
      'account': () => this.accountButton(),
      'cart': () => this.shoppingCartButton(),
      'language': () => this.languageButton(),
      'cookie': () => this.cookieConsentMessage()
    };

    const getElement = elementMap[element];
    if (!getElement) {
      throw new Error(`Invalid element: ${element}`);
    }

    return getElement().then($el => {
      return Cypress.dom.isVisible($el);
    });
  }
}

export default TopNavigationPage;