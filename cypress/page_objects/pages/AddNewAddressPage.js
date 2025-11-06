import BasePage from '../BasePage';

/**
 * Page Object Model for OWASP Juice Shop Add New Address Page
 * @typedef {import('../../fixtures/address.json')} Address
 */
class AddNewAddressPage extends BasePage {
  constructor() {
    super();
    this.path = '/#/address/create';
  }

  // ============ Form Elements ============

  // Country input field
  countryInput() {
    return cy.get('#address-form mat-form-field:first-child input[type="text"]');
  }

  // Name input field
  nameInput() {
    return cy.get('#address-form mat-form-field:nth-child(2) input[type="text"]');
  }

  // Mobile number input field
  mobileNumberInput() {
    return cy.get('#address-form mat-form-field:nth-child(3) input[type="number"]');
  }

  // ZIP code input field
  zipCodeInput() {
    return cy.get('#address-form mat-form-field:nth-child(4) input[type="text"]');
  }

  // Address input field
  addressInput() {
    return cy.get('textarea#address');
  }

  // City input field
  cityInput() {
    return cy.get('#address-form mat-form-field:nth-child(6) input[type="text"]');
  }

  // State input field
  stateInput() {
    return cy.get('#address-form mat-form-field:nth-child(7) input[type="text"]');
  }

  // Back button
  backButton() {
    return cy.contains('button', 'Back');
  }

  // Submit button
  submitButton() {
    return cy.get('#submitButton');
  }

  // ============ Actions ============

  /**
   * Navigate to add new address page
   */
  visit() {
    super.visit(this.path);
  }

  /**
   * Fill address form fields
   * @param {Object} address - Address details
   */
  fillAddressForm(address) {
    this.stateInput().scrollIntoView();
    if (address.country) this.countryInput().clear().type(address.country);
    if (address.name) this.nameInput().clear().type(address.name);
    if (address.mobileNumber) this.mobileNumberInput().clear().type(address.mobileNumber);
    if (address.zipCode) this.zipCodeInput().clear().type(address.zipCode);
    if (address.address) this.addressInput().clear().type(address.address);
    if (address.city) this.cityInput().clear().type(address.city);
    if (address.state) this.stateInput().clear().type(address.state);
  }

  /**
   * Click back button
   */
  clickBack() {
    this.backButton().click();
  }

  /**
   * Click submit button
   */
  submit() {
    this.submitButton().click();
  }

  /**
   * Add new address with provided details
   * @param {Address} address - Address object containing all details
   */
  addNewAddress(address) {
    this.fillAddressForm({
      country: address.country,
      name: address.name,
      mobileNumber: address.mobileNumber,
      zipCode: address.zipCode,
      address: address.address,
      city: address.city,
      state: address.state
    });
    this.submit();
  }

  // ============ Assertions ============

  /**
   * Verify page has loaded successfully
   */
  verifyPageLoaded() {
    this.verifyUrl(this.path);
    this.verifyAddressFormVisible();
  }

  /**
   * Verify address form is visible
   */
  verifyAddressFormVisible() {
    this.stateInput().scrollIntoView();
    this.countryInput().should('be.visible');
    this.nameInput().should('be.visible');
    this.mobileNumberInput().should('be.visible');
    this.zipCodeInput().should('be.visible');
    this.addressInput().should('be.visible');
    this.cityInput().should('be.visible');
    this.stateInput().should('be.visible');
    this.submitButton().should('be.visible');
  }

  /**
   * Verify form field has error
   * @param {string} field - Field name
   */
  verifyFieldError(field) {
    const fieldMap = {
      country: this.countryInput(),
      name: this.nameInput(),
      mobileNumber: this.mobileNumberInput(),
      zipCode: this.zipCodeInput(),
      address: this.addressInput(),
      city: this.cityInput(),
      state: this.stateInput()
    };

    fieldMap[field].parent('mat-form-field').should('have.class', 'ng-invalid');
  }

  /**
   * Verify specific element is visible
   * @param {string} element - Element name to check
   */
  verifyElementVisible(element) {
    const elementMap = {
      country: this.countryInput(),
      name: this.nameInput(),
      mobileNumber: this.mobileNumberInput(),
      zipCode: this.zipCodeInput(),
      address: this.addressInput(),
      city: this.cityInput(),
      state: this.stateInput(),
      back: this.backButton(),
      submit: this.submitButton()
    };

    const getElement = elementMap[element];
    if (!getElement) {
      throw new Error(`Invalid element: ${element}`);
    }
    getElement.should('be.visible');
  }
}

export default AddNewAddressPage;