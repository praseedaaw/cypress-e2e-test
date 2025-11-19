/**
 * Cypress Support Configuration
 * This file is processed and loaded automatically before test files.
 * Contains global configuration and behavior modifications for Cypress.
 */

// Import custom commands
import './commands';

// Import test reporting
import 'cypress-mochawesome-reporter/register';

// Global imports - Available in all spec files without explicit imports
import Constants from './Constants';
import PageObjectFactory from './PageObjectFactory';

// Make available globally
Cypress.Constants = Constants;
Cypress.PageObjectFactory = PageObjectFactory;