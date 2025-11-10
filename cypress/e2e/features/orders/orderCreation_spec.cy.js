/**
 * @fileoverview Order Creation End-to-End Test Specification
 * This spec contains test scenarios for the complete order creation flow in OWASP Juice Shop,
 * including login, cart management, checkout process, and order verification.
 * @author Praseeda Achuthawarrier
 * @lastModified 2025-11-06
 */

/// <reference types="cypress" />
import { BaseTest } from '../baseTest_spec.cy';

describe('Juice Shop - Ordering products', () => {
  const baseTest = new BaseTest();

  before(() => {
    baseTest.loadTestData();
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
      baseTest.homePage.addToBasket(0);
      baseTest.homePage.addToBasket(1);
      baseTest.homePage.addToBasket(2);
      baseTest.homePage.addToBasket(3);
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
      baseTest.topNav.clickAccount();
      baseTest.accountTabPage.clickOrderHistory();
      baseTest.orderHistoryPage.verifyPageLoaded();
      baseTest.orderHistoryPage.verifyOrderVisible(1);
    });
  });
});
