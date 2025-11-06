import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Payment Options Page
 */
class PaymentOptionsPage extends BasePage {
    constructor() {
      super();
      this.path = '/#/payment/shop';
    }

    // ============ Element Selectors ============
  
   // Payment method radio button
   paymentMethodRadio(index) {
    return cy.get('input[type="radio"].mdc-radio__native-control').eq(index);
  }

    // Continue button
    continueButton() {
      return cy.get('.mdc-button__label span').contains('Continue');
    }
  
    // ============ Actions ============
  
    /**
     * Navigate to login page
     */
    visit() {
      super.visit(this.path);
    }

    /**
     * Select the first delivery option in the list
     */
    selectFirstDPaymentMethod() {
      return this.paymentMethodRadio(1).click();
    }

    /**
     * Click continue button
     * */
    clickContinue() {
      this.continueButton().click({ force: true });
    }
    
    // ============ Assertions ============
  
    /**
     * Verify page has loaded successfully
     */
    verifyPageLoaded() {
      this.verifyUrl(this.path);
      this.paymentMethodRadio(1).should('exist').and('not.be.disabled');
    }
  }
  
  export default PaymentOptionsPage;