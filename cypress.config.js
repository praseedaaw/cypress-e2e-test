const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,cy.js}",
    supportFile: "cypress/support/e2e.js",
    experimentalInteractiveRunEvents: true,
    baseUrl: 'http://localhost:3000',
    // Timeout configurations
    defaultCommandTimeout: 4000,      // Time to wait for cy.get() and assertions
    pageLoadTimeout: 60000,          // Time to wait for page loads
    // Screenshots and videos
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/reports/html/screenshots',
    video: true,
    videosFolder: 'cypress/reports/html/videos',
    // Page paths configuration
    pageUrls: {
      base: '/#/',
      login: '/#/login',
      checkout: '/#/basket',
      selectAddress: '/#/address/select',
      addNewAddress: '/#/address/create',
      chooseDelivery: '/#/delivery-method',
      paymentOptions: '/#/payment/shop',
      orderSummary: '/#/order-summary',
      orderCompletion: '/#/order-completion/',
      orderHistory: '/#/order-history'
    }
  },
});
