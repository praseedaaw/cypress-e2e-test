import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Payment Options Page
 */
class PaymentOptionsPage extends BasePage {
    constructor() {
      super();
      this.path = this.pageUrls.paymentOptions;
    }

    // ============ Element Selectors ============
  
    // Payment method radio button
    paymentMethodRadio(index) {
      return this.getElement('input[type="radio"].mdc-radio__native-control').eq(index);
    }

    // Continue button
    continueButton() {
      return this.getElement('.mdc-button__label span').contains('Continue');
    }
  
    // ============ Actions ============
    visit() {
      super.visit(this.path);
    }

    selectFirstPaymentMethod() {
      return this.paymentMethodRadio(1).click();
    }

    clickContinue() {
      this.continueButton().click({ force: true });
    }
    
    // ============ Assertions ============
    verifyPageLoaded() {
      this.verifyUrl(this.path);
      this.paymentMethodRadio(1).should('exist').and('not.be.disabled');
    }
}
  
export default PaymentOptionsPage;