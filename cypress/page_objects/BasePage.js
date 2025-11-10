/**
 * Base Page Object Model for all pages
 */
class BasePage {
    constructor() {
        this.baseUrl = Cypress.config('baseUrl');
        this.pageUrls = Cypress.config('pageUrls');
        this.timeout = {
            defaultCommand: Cypress.config('defaultCommandTimeout'),
            pageLoad: Cypress.config('pageLoadTimeout')
        };
    }

    /**
     * Visit page with base URL
     * @param {string} path - Path to append to base URL
     */
    visit(path = '/') {
        cy.visit(path, { timeout: this.timeout.pageLoad });
    }

    /**
     * Get element with default command timeout
     * @param {string} selector - Element selector
     */
    getElement(selector) {
        return cy.get(selector, { timeout: this.timeout.defaultCommand });
    }

    /**
     * Get element with custom timeout
     * @param {string} selector - Element selector
     * @param {number} timeout - Custom timeout in ms
     */
    getElementWithTimeout(selector, timeout) {
        return cy.get(selector, { timeout });
    }

    /**
     * Get full URL including base URL
     * @param {string} path - Path to append to base URL
     * @returns {string} Full URL
     */
    getUrl(path) {
        return `${this.baseUrl}${path}`;
    }

    /**
     * Verify URL contains specific path
     * @param {string} path - Path to verify
     */
    verifyUrl(path) {
        cy.url({ timeout: this.timeout.pageLoad }).should('include', path);
    }

    /**
     * Verify list has exact length
     * @param {string} selector - Element selector
     * @param {number} expectedLength - Expected length of the list
     */
    verifyListLength(selector, expectedLength) {
        this.getElement(selector).should('have.length', expectedLength);
    }

    /**
     * Verify list has length less than expected
     * @param {string} selector - Element selector
     * @param {number} expectedLength - Expected maximum length
     */
    verifyListLengthLessThan(selector, expectedLength) {
        this.getElement(selector).should('have.length.lessThan', expectedLength);
    }

    /**
     * Verify list has length greater than expected
     * @param {string} selector - Element selector
     * @param {number} expectedLength - Expected minimum length
     */
    verifyListLengthGreaterThan(selector, expectedLength) {
        this.getElement(selector).should('have.length.greaterThan', expectedLength);
    }
}

export default BasePage;