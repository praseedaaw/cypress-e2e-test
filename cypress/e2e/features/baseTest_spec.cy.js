/**
 * @fileoverview Base Test Specification
 * Implements dependency injection pattern for page objects
 */

/// <reference types="cypress" />

export class BaseTest {
    /**
     * Initialize BaseTest with dependency injection
     * @param {string[]} requiredPages - Array of page types needed for the test
     */
    constructor(requiredPages = []) {
        this._pageObjects = {};
        this._initializeRequiredPages(requiredPages);
    }

    /**
     * Initialize only the required page objects
     * @param {string[]} pages - Array of page types to initialize
     * @private
     */
    _initializeRequiredPages(pages) {
        pages.forEach(pageType => {
            if (!Object.values(Cypress.Constants.PAGE_TYPES).includes(pageType)) {
                throw new Error(`Invalid page type: ${pageType}. Available types: ${Object.values(Cypress.Constants.PAGE_TYPES).join(', ')}`);
            }
            this._pageObjects[pageType] = Cypress.PageObjectFactory.create(pageType);
        });
    }

    /**
     * Get page object instance (no lazy loading - must be in requiredPages)
     * @param {string} pageType - Type of page object to get
     * @returns {Object} Page object instance
     * @throws {Error} If page type was not initialized during construction
     */
    getPage(pageType) {
        if (!this._pageObjects[pageType]) {
            throw new Error(`Page '${pageType}' not initialized. Add it to requiredPages array in constructor. Available pages: ${Object.keys(this._pageObjects).join(', ')}`);
        }
        return this._pageObjects[pageType];
    }

    /**
     * Convenience getters for commonly used page objects
     * These provide clean, readable syntax while enforcing explicit dependencies
     */
    get basePage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.BASE_PAGE);
    }

    get commonDialogs() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.COMMON_DIALOGS);
    }

    get loginPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.LOGIN);
    }

    get homePage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.HOME);
    }

    get topNav() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.TOP_NAV);
    }

    get checkoutPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.CHECKOUT);
    }

    get selectAddressPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.SELECT_ADDRESS);
    }

    get addNewAddressPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.ADD_NEW_ADDRESS);
    }

    get chooseDeliverySpeedPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.CHOOSE_DELIVERY_SPEED);
    }

    get paymentOptionsPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.PAYMENT_OPTIONS);
    }

    get orderSummaryPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.ORDER_SUMMARY);
    }

    get accountTabPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.ACCOUNT_TAB);
    }

    get orderHistoryPage() {
        return this.getPage(Cypress.Constants.PAGE_TYPES.ORDER_HISTORY);
    }

    /**
     * Get list of initialized page objects
     * @returns {string[]} Array of initialized page types
     */
    getInitializedPages() {
        return Object.keys(this._pageObjects);
    }

    /**
     * Load test data from fixtures
     */
    loadTestData() {
        return new Cypress.Promise((resolve) => {
            // Load user data fixture
            cy.fixture('users.json').then((users) => {
                this.userData = users;
                // Load address data fixture
                cy.fixture('address.json').then((addresses) => {
                    this.addressData = addresses;
                    resolve();
                });
            });
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