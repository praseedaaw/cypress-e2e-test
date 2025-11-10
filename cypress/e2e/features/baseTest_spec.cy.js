/**
 * @fileoverview Base Test Specification
 */

/// <reference types="cypress" />
// Common components
import { TopNavigationPage, AccountTabPage, CommonDialogsPage } from '../../page_objects/common';
import BasePage from '../../page_objects/BasePage';
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
} from '../../page_objects/pages';

export class BaseTest {
    constructor() {
        // Initialize common page objects
        this.basePage = new BasePage();
        this.commonDialogs = new CommonDialogsPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.topNav = new TopNavigationPage();
        this.checkoutPage = new CheckoutPage();
        this.selectAddressPage = new SelectAddressPage();
        this.addNewAddressPage = new AddNewAddressPage();
        this.chooseDeliverySpeedPage = new ChooseDeliverySpeedPage();
        this.paymentOptionsPage = new PaymentOptionsPage();
        this.orderSummaryPage = new OrderSummaryPage();
        this.accountTabPage = new AccountTabPage();
        this.orderHistoryPage = new OrderHistoryPage();
    }

    /**
     * Load test data from fixtures
     */
    loadTestData() {
        // Load user data fixture
        cy.fixture('users.json').then((users) => {
            this.userData = users;
        });
        // Load address data fixture
        cy.fixture('address.json').then((addresses) => {
            this.addressData = addresses;
        });
    }

    /**
     * Basic setup before each test
     */
    setup() {
        cy.step('Setup: Navigate to application', () => {
            this.basePage.visit();
        });
        
        cy.step('Setup: Handle initial dialogs', () => {
            this.commonDialogs.handleInitialDialogs();
        });
    }

    /**
     * Login as admin user
     */
    loginAsAdmin() {
        cy.step('Login: Authenticate as admin user', () => {
            this.loginPage.visit();
            this.loginPage.verifyPageLoaded();
            this.loginPage.login(this.userData.admin.email, this.userData.admin.password);
        });
    }

    /**
     * Clear shopping cart
     */
    clearShoppingCart() {
        cy.step('Cart: Clear existing items', () => {
            this.topNav.clickShoppingCart();
            this.checkoutPage.verifyPageLoaded();
            this.checkoutPage.clearBasketIfNotEmpty();
        });
    }
}