/**
 * Factory for creating page objects
 * Implements dependency injection pattern for better resource management
 */

import Constants from './Constants';
// Common components
import { TopNavigationPage, AccountTabPage, CommonDialogsPage } from '../page_objects/common';
import BasePage from '../page_objects/BasePage';
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
} from '../page_objects/pages';

class PageObjectFactory {
    /**
     * Create page object instance based on type
     * @param {string} pageType - Type of page object to create
     * @returns {Object} Page object instance
     */
    static create(pageType) {
        switch (pageType) {
            // Base and common objects
            case Constants.PAGE_TYPES.BASE_PAGE:
                return new BasePage();
            case Constants.PAGE_TYPES.COMMON_DIALOGS:
                return new CommonDialogsPage();
            case Constants.PAGE_TYPES.TOP_NAV:
                return new TopNavigationPage();
            case Constants.PAGE_TYPES.ACCOUNT_TAB:
                return new AccountTabPage();
            
            // Page objects
            case Constants.PAGE_TYPES.LOGIN:
                return new LoginPage();
            case Constants.PAGE_TYPES.HOME:
                return new HomePage();
            case Constants.PAGE_TYPES.CHECKOUT:
                return new CheckoutPage();
            case Constants.PAGE_TYPES.SELECT_ADDRESS:
                return new SelectAddressPage();
            case Constants.PAGE_TYPES.ADD_NEW_ADDRESS:
                return new AddNewAddressPage();
            case Constants.PAGE_TYPES.CHOOSE_DELIVERY_SPEED:
                return new ChooseDeliverySpeedPage();
            case Constants.PAGE_TYPES.PAYMENT_OPTIONS:
                return new PaymentOptionsPage();
            case Constants.PAGE_TYPES.ORDER_SUMMARY:
                return new OrderSummaryPage();
            case Constants.PAGE_TYPES.ORDER_HISTORY:
                return new OrderHistoryPage();
            
            default:
                throw new Error(`Unknown page type: ${pageType}. Available types: ${Object.values(Constants.PAGE_TYPES).join(', ')}`);
        }
    }

    /**
     * Get list of available page types
     * @returns {string[]} Array of available page types
     */
    static getAvailableTypes() {
        return Object.values(Constants.PAGE_TYPES);
    }

    /**
     * Validate if page type exists
     * @param {string} pageType - Page type to validate
     * @returns {boolean} True if page type is valid
     */
    static isValidPageType(pageType) {
        return Object.values(Constants.PAGE_TYPES).includes(pageType);
    }
}

export default PageObjectFactory;