import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Select Address Page
 */
class ChooseDeliverySpeedPage extends BasePage {
    // ============ Configuration ============
    constructor() {
      super();
      this.path = '/#/delivery-method';
    }
  
    // ============ Element Selectors ============
  
   // Select delivery speed button
   selectDeliverySpeedButton(index) {
      return cy.get('.mat-column-Selection').eq(index);
    }

    // Continue button
    continueButton() {
      return cy.get('.mdc-button__label').contains('span', 'Continue');
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
    selectFirstDeliverySpeed() {
      return this.selectDeliverySpeedButton(1).click({ force: true });
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
      this.selectDeliverySpeedButton(1).should('exist').and('not.be.disabled');
    }
  }
  
  export default ChooseDeliverySpeedPage;