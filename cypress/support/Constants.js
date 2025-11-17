/**
 * Constants class for centralized configuration values
 * Contains page types, test data constants, and other framework-wide values
 */
class Constants {
    /**
     * Page Object Types - Used by PageObjectFactory and test specifications
     */
    static PAGE_TYPES = {
        // Base and Common Components
        BASE_PAGE: 'basePage',
        COMMON_DIALOGS: 'commonDialogs',
        TOP_NAV: 'topNav',
        ACCOUNT_TAB: 'accountTab',
        
        // Application Pages
        LOGIN: 'login',
        HOME: 'home',
        CHECKOUT: 'checkout',
        SELECT_ADDRESS: 'selectAddress',
        ADD_NEW_ADDRESS: 'addNewAddress',
        CHOOSE_DELIVERY_SPEED: 'chooseDeliverySpeed',
        PAYMENT_OPTIONS: 'paymentOptions',
        ORDER_SUMMARY: 'orderSummary',
        ORDER_HISTORY: 'orderHistory',
        ORDER_COMPLETION: 'orderCompletion'
    };
}

export default Constants;