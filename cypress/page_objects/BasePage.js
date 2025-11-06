/**
 * Base Page Object Model for all pages
 */
class BasePage {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.CONFIG = {
            TIMEOUTS: {
                PAGE_LOAD: 10000,
                ELEMENT_VISIBLE: 2000,
                NAVIGATION: 30000
            }
        };
    }

    /**
     * Visit page with base URL
     * @param {string} path - Path to append to base URL
     */
    visit(path = '/') {
        cy.visit(`${this.baseUrl}${path}`);
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
        cy.url().should('include', path);
    }
}

export default BasePage;