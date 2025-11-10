import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Choose Delivery Speed Page
 */
class ChooseDeliverySpeedPage extends BasePage {
    // ============ Configuration ============
    constructor() {
      super();
      this.path = this.pageUrls.chooseDelivery;
    }
  
    // ============ Element Selectors ============
  
   // Select delivery speed button
   selectDeliverySpeedButton(index) {
      return this.getElement('.mat-column-Selection').eq(index);
    }

    // Continue button
    continueButton() {
      return this.getElement('.mdc-button__label').contains('span', 'Continue');
    }
  
    // ============ Actions ============
  
    /**
     * Navigate to Choose Delivery Speed page
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