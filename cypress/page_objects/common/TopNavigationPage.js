import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop top navigation bar
 * This is a shared component that can be used across all pages
 */
class TopNavigationPage extends BasePage {
  // ============ Configuration ============
  constructor() {
    super();
    this.path = '/';
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
  cookieConsentMessage() {
    return cy.get('#cookieconsent\\:desc');
  }

  // ============ Main Elements ============
  menuButton() {
    return cy.get('[aria-label="Open Sidenav"]');
  }

  owaspJuiceShopButton() {
    return cy.contains('Back to homepage');
  }

  accountButton() {
    return cy.get('[aria-label="Show/hide account menu"]');
  }

  shoppingCartButton() {
    return cy.get('[aria-label="Show the shopping cart"]');
  }

  languageButton() {
    return cy.get('[aria-label="Language selection menu"]');
  }

  // ============ Actions ============
  visit() {
    super.visit(this.path);
  }

  clickMenu() {
    this.menuButton().click();
  }

  clickOwaspJuiceShop() {
    this.owaspJuiceShopButton().click();
  }

  clickAccount() {
    this.accountButton().click();
  }

  clickShoppingCart() {
    this.shoppingCartButton().click();
  }

  clickLanguage() {
    this.languageButton().click();
  }

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
  verifyPageLoaded() {
    cy.url().should('include', this.CONFIG.PAGE_PATH);
    this.cookieConsentMessage().should('be.visible');
  }

  verifyAllButtonsVisible() {
    this.menuButton().should('be.visible');
    this.owaspJuiceShopButton().should('be.visible');
    this.accountButton().should('be.visible');
    this.shoppingCartButton().should('be.visible');
    this.languageButton().should('be.visible');
  }

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