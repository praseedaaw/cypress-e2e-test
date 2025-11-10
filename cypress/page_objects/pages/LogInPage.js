import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Log In Page
 */
class LoginPage extends BasePage {
  constructor() {
    super();
    this.path = this.pageUrls.login;
  }

  // ============ Element Selectors ============

  // Email input field
  emailInput() {
    return this.getElement('[name="email"]');
  }

  // Password input field
  passwordInput() {
    return this.getElement('[name="password"]');
  }

  // Show password button
  showPasswordButton() {
    return this.getElement('[data-mat-icon-name="visibility"]');
  }

  // Forgot password link
  forgotPasswordLink() {
    return this.getElement('a').contains('Forgot your password?');
  }

  // Login with Google button
  googleLoginButton() {
    return this.getElement('button').contains('Login with Google');
  }

  // Not a customer link
  notCustomerLink() {
    return this.getElement('a').contains('Not yet a customer?');
  }

  // Login button
  loginButton() {
    return this.getElement('button[type="submit"]');
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
