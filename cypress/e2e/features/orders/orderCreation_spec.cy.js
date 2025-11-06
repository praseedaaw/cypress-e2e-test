/**
 * @fileoverview Order Creation End-to-End Test Specification
 * This spec contains test scenarios for the complete order creation flow in OWASP Juice Shop,
 * including login, cart management, checkout process, and order verification.
 *
 * @author Praseeda Achuthawarrier
 * @lastModified 2025-11-06
 */

/// <reference types="cypress" />
// Common components
import { TopNavigationPage, AccountTabPage } from '../../../page_objects/common';
import BasePage from '../../../page_objects/BasePage';

// Pages
import {
  LoginPage,
  HomePage,
  CheckoutPage,
  SelectAddressPage,
  AddNewAddressPage,
  ChooseDeliverySpeedPage,
  PaymentOptionsPage,
  OrderSummaryPage,
  OrderHistoryPage
} from '../../../page_objects/pages';

describe('Juice Shop - Ordering products', () => {
  let userData;
  let addressData;
  const basePage = new BasePage();

  before(() => {
    // Load the user data fixture
    cy.fixture('users.json').then((users) => {
      userData = users;
    });
    // Load the address data fixture
    cy.fixture('address.json').then((addresses) => {
      addressData = addresses;
    });
  });

  beforeEach(() => {
    cy.step('Setup: Navigate to application', () => {
      basePage.visit();
    });
    
    cy.step('Setup: Handle initial dialogs', () => {
      cy.get('body').then($body => {
        if ($body.find('a.cc-btn').length > 0) {
          cy.get('a.cc-btn').should('be.visible').click();
        }
        if ($body.find('#mat-mdc-dialog-0').length > 0) {
          cy.get('#mat-mdc-dialog-0 span.hide-lt-sm').should('be.visible').click();
        }
      });
    });
  });

  it('order_multiple_items_spec', function() {
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const topNav = new TopNavigationPage();
    const checkoutPage = new CheckoutPage();
    const selectAddressPage = new SelectAddressPage();
    const addNewAddressPage = new AddNewAddressPage();
    const chooseDeliverySpeedPage = new ChooseDeliverySpeedPage();
    const paymentOptionsPage = new PaymentOptionsPage();
    const orderSummaryPage = new OrderSummaryPage();
    const accountTabPage = new AccountTabPage();
    const orderHistoryPage = new OrderHistoryPage();

    // Step 1: Authentication
    cy.step('Login: Authenticate as admin user', () => {
      loginPage.visit();
      loginPage.verifyPageLoaded();
      loginPage.login(userData.admin.email, userData.admin.password);
    });

    // Step 2: Cart Preparation
    cy.step('Cart: Clear existing items', () => {
      topNav.clickShoppingCart();
      checkoutPage.verifyPageLoaded();
      checkoutPage.clearBasketIfNotEmpty();
    });

    cy.step('Cart: Add new items to basket', () => {
      homePage.visit();
      homePage.addToBasket(0);
      homePage.addToBasket(1);
      homePage.addToBasket(2);
      homePage.addToBasket(3);
    });

    // Step 3: Cart Modification
    cy.step('Cart: Modify item quantities', () => {
      topNav.clickShoppingCart();
      checkoutPage.verifyPageLoaded();
      checkoutPage.increaseQuantity(1); // Increase quantity of an item that has quantity 1
      checkoutPage.decreaseQuantity(1); // Decrease quantity of an item that has quantity 2
      checkoutPage.removeItem(1); // Remove first item using new method
      cy.get('mat-row').should('have.length.lessThan', 4); // Verify item removal before proceeding
    });

    // Step 4: Checkout Process
    cy.step('Checkout: Initiate checkout process', () => {
      checkoutPage.verifyCheckoutEnabled();
      checkoutPage.proceedToCheckout();
    });

    // Step 5: Address and Delivery
    cy.step('Checkout: Fill shipping details', () => {
      selectAddressPage.verifyPageLoaded();
      selectAddressPage.clickAddNewAddress();
      addNewAddressPage.verifyPageLoaded();
      addNewAddressPage.addNewAddress(addressData.defaultAddress);
      selectAddressPage.selectLatestAddress();
      selectAddressPage.clickContinue();
    });

    cy.step('Checkout: Complete order process', () => {
      chooseDeliverySpeedPage.verifyPageLoaded();
      chooseDeliverySpeedPage.selectFirstDeliverySpeed();
      chooseDeliverySpeedPage.continueButton().click();
      paymentOptionsPage.verifyPageLoaded();
      paymentOptionsPage.selectFirstDPaymentMethod();
      paymentOptionsPage.clickContinue();
      orderSummaryPage.verifyPageLoaded();
      orderSummaryPage.clickPlaceOrder();
    });

    // Step 6: Order Verification
    cy.step('Verification: Check order in history', () => {
      topNav.clickAccount();
      accountTabPage.clickOrderHistory();
      orderHistoryPage.verifyPageLoaded();
      orderHistoryPage.verifyOrderVisible(1);
    });
  });
});
