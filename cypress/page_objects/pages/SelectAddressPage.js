import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Select Address Page
 */
class SelectAddressPage extends BasePage {
    // ============ Configuration ============
    constructor() {
      super();
      this.path = this.pageUrls.selectAddress;
    }
  
    // ============ Element Selectors ============
  
    // Add new address button
    addNewAddressButton() {
      return this.getElement('#card button.mat-mdc-button-base.btn-new-address span.mdc-button__label span');
    }

    // Select address button by index
    selectAddressButton(index) {
        return this.getElement(`#card mat-row:nth-child(${index+1}) mat-cell.mat-column-Address`);
    }

    // Get all address rows
    addressRows() {
      return this.getElement('#card mat-row');
    }

    // Continue button
    continueButton() {
      return this.getElement('#card app-address mat-card button span.mdc-button__label').eq(1);
    }
  
    // ============ Actions ============
  
    /**
     * Navigate to Select Address page
     */
    visit() {
      super.visit(this.path);
    }
  
    /**
     * Click Add new address button
     */
    clickAddNewAddress() {
      this.addNewAddressButton().click();
    }

    /**
     * Select address by index
     * @param {number} index - Address index
    */
    clickSelectAddress(index) {
    this.selectAddressButton(index).click();
    }

    /**
     * Select the latest (last) address in the list
     */
    selectLatestAddress() {
      return this.addressRows().then($rows => {
        const lastIndex = $rows.length-1;
        if (lastIndex >= 0) {
          this.clickSelectAddress(lastIndex);
        } else {
          throw new Error('No addresses found in the list');
        }
      });
    }

    /**
     * Get total count of addresses
     * @returns {Cypress.Chainable<number>} Number of addresses
     */
    getAddressCount() {
      return this.addressRows().its('length');
    }

    /**
     * Click continue button
     * */
    clickContinue() {
      this.continueButton().click();
    }
    
    // ============ Assertions ============
  
    /**
     * Verify page has loaded successfully
     */
    verifyPageLoaded() {
      this.verifyUrl(this.path);
      this.addNewAddressButton().should('be.visible');
    }
  }
  
  export default SelectAddressPage;