/**
 * @fileoverview Order Creation End-to-End Test Specification
 * Uses dependency injection pattern for efficient page object management
 */

/// <reference types="cypress" />
import { BaseTest } from '../baseTest_spec.cy';

describe('Juice Shop - Ordering products', () => {
  let baseTest;

  before(() => {
    // Initialize BaseTest with required page objects using Constants
    const requiredPages = [
      Cypress.Constants.PAGE_TYPES.BASE_PAGE,
      Cypress.Constants.PAGE_TYPES.COMMON_DIALOGS,
      Cypress.Constants.PAGE_TYPES.LOGIN,
      Cypress.Constants.PAGE_TYPES.HOME,
      Cypress.Constants.PAGE_TYPES.TOP_NAV,
      Cypress.Constants.PAGE_TYPES.CHECKOUT,
      Cypress.Constants.PAGE_TYPES.SELECT_ADDRESS,
      Cypress.Constants.PAGE_TYPES.ADD_NEW_ADDRESS,
      Cypress.Constants.PAGE_TYPES.CHOOSE_DELIVERY_SPEED,
      Cypress.Constants.PAGE_TYPES.PAYMENT_OPTIONS,
      Cypress.Constants.PAGE_TYPES.ORDER_SUMMARY,
      Cypress.Constants.PAGE_TYPES.ACCOUNT_TAB,
      Cypress.Constants.PAGE_TYPES.ORDER_HISTORY,
      Cypress.Constants.PAGE_TYPES.ORDER_COMPLETION
    ];
    
    baseTest = new BaseTest(requiredPages);
    
    // Load test data
    return baseTest.loadTestData();
  });

  beforeEach(() => {
    baseTest.setup();
  });

  it('order_multiple_items_spec', function() {
    // Step 1: Authentication
    baseTest.loginAsAdmin();

    // Step 2: Cart Preparation
    baseTest.clearShoppingCart();

    cy.step('Cart: Add new items to basket', () => {
      baseTest.homePage.visit();
      baseTest.homePage.addItemToBasketByIndex(0);
      baseTest.homePage.addItemToBasketByIndex(1);
      baseTest.homePage.addItemToBasketByIndex(2);
      baseTest.homePage.addItemToBasketByIndex(3);
    });

    // Step 3: Cart Modification
    cy.step('Cart: Modify item quantities', () => {
      baseTest.topNav.clickShoppingCart();
      baseTest.checkoutPage.verifyPageLoaded();
      baseTest.checkoutPage.increaseQuantity(1);
      baseTest.checkoutPage.decreaseQuantity(1);
      baseTest.checkoutPage.removeItem(1);
      baseTest.checkoutPage.verifyBasketItemCountLessThan(4);
    });

    // Step 4: Checkout Process
    cy.step('Checkout: Initiate checkout process', () => {
      baseTest.checkoutPage.verifyCheckoutEnabled();
      baseTest.checkoutPage.proceedToCheckout();
    });

    // Step 5: Address and Delivery
    cy.step('Checkout: Fill shipping details', () => {
      baseTest.selectAddressPage.verifyPageLoaded();
      baseTest.selectAddressPage.clickAddNewAddress();
      baseTest.addNewAddressPage.verifyPageLoaded();
      baseTest.addNewAddressPage.addNewAddress(baseTest.addressData.defaultAddress);
      baseTest.selectAddressPage.selectLatestAddress();
      baseTest.selectAddressPage.clickContinue();
    });

    cy.step('Checkout: Complete order process', () => {
      baseTest.chooseDeliverySpeedPage.verifyPageLoaded();
      baseTest.chooseDeliverySpeedPage.selectFirstDeliverySpeed();
      baseTest.chooseDeliverySpeedPage.continueButton().click();
      baseTest.paymentOptionsPage.verifyPageLoaded();
      baseTest.paymentOptionsPage.selectFirstPaymentMethod();
      baseTest.paymentOptionsPage.clickContinue();
      baseTest.orderSummaryPage.verifyPageLoaded();
      baseTest.orderSummaryPage.clickPlaceOrder();
    });

    // Step 6: Order Verification
    cy.step('Verification: Check order in history', () => {
      baseTest.orderCompletionPage.verifyPageLoaded();
      baseTest.topNav.clickAccount();
      baseTest.accountTabPage.clickOrderHistory();
      baseTest.orderHistoryPage.verifyPageLoaded();
      baseTest.orderHistoryPage.verifyOrderVisible(1);
    });
  });

  after(() => {
    // Log initialized page objects for debugging
    cy.log('Test completed with page objects:', baseTest.getInitializedPages());
    cy.log('Total pages initialized:', baseTest.getInitializedPages().length);
  });
});
