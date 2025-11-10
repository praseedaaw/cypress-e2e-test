import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop top navigation bar
 * This is a shared component that can be used across all pages
 */
class TopNavigationPage extends BasePage {
  constructor() {
    super();
    this.path = '/';
  }

  // ============ Modal Elements ============
  cookieConsentMessage() {
    return this.getElement('#cookieconsent\\:desc');
  }

  // ============ Main Elements ============
  menuButton() {
    return this.getElement('[aria-label="Open Sidenav"]');
  }

  owaspJuiceShopButton() {
    return this.getElement('a').contains('Back to homepage');
  }

  accountButton() {
    return this.getElement('[aria-label="Show/hide account menu"]');
  }

  shoppingCartButton() {
    return this.getElement('[aria-label="Show the shopping cart"]');
  }

  languageButton() {
    return this.getElement('[aria-label="Language selection menu"]');
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
    this.verifyUrl(this.path);
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