import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Log In Page
 */
class LoginPage extends BasePage {
  constructor() {
    super();
    this.path = '/#/login';
  }

  // ============ Element Selectors ============

  // Cookie consent message
  cookieConsentMessage() {
    return cy.get('#cookieconsent\\:desc');
  }

  // Email input field
  emailInput() {
    return cy.get('[name="email"]');
  }

  // Password input field
  passwordInput() {
    return cy.get('[name="password"]');
  }

  // Show password button
  showPasswordButton() {
    return cy.get('[data-mat-icon-name="visibility"]');
  }

  // Forgot password link
  forgotPasswordLink() {
    return cy.contains('Forgot your password?');
  }

  // Login with Google button
  googleLoginButton() {
    return cy.contains('Login with Google');
  }

  // Not a customer link
  notCustomerLink() {
    return cy.contains('Not yet a customer?');
  }

  // Menu button
  menuButton() {
    return cy.get('[aria-label="Open Sidenav"]');
  }

  // Account button
  accountButton() {
    return cy.get('[aria-label="Show/hide account menu"]');
  }

  // Language selection button
  languageButton() {
    return cy.get('[aria-label="Language selection menu"]');
  }

  // Login button
  loginButton() {
    return cy.get('button[type="submit"]');
  }

  // ============ Actions ============

  /**
   * Navigate to login page
   */
  visit() {
    super.visit(this.path);
  }

  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   */
  login(email, password) {
    this.emailInput().type(email);
    this.passwordInput().type(password);
    this.loginButton().click();
  }

  /**
   * Click menu button
   */
  clickMenu() {
    this.menuButton().click();
  }

  /**
   * Click account button
   */
  clickAccount() {
    this.accountButton().click();
  }

  /**
   * Click language button
   */
  clickLanguage() {
    this.languageButton().click();
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility() {
    this.showPasswordButton().click();
  }

  /**
   * Click forgot password link
   */
  clickForgotPassword() {
    this.forgotPasswordLink().click();
  }

  /**
   * Click Google login button
   */
  clickGoogleLogin() {
    this.googleLoginButton().click();
  }

  /**
   * Click not a customer link
   */
  clickNotCustomer() {
    this.notCustomerLink().click();
  }

  // ============ Assertions ============

  /**
   * Verify page has loaded successfully
   */
  verifyPageLoaded() {
    this.verifyUrl(this.path);
    this.emailInput().should('be.visible');
    this.passwordInput().should('be.visible');
  }

  /**
   * Verify all interactive elements are visible
   */
  verifyAllElementsVisible() {
    this.emailInput().should('be.visible');
    this.passwordInput().should('be.visible');
    this.showPasswordButton().should('be.visible');
    this.forgotPasswordLink().should('be.visible');
    this.googleLoginButton().should('be.visible');
    this.notCustomerLink().should('be.visible');
  }
}

export default LoginPage;
