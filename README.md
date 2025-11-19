# CYPRESS-E2E-TEST

## 📘 Project Overview
End-to-end testing framework for OWASP Juice Shop using Cypress with Page Object Model pattern. This framework provides automated testing capabilities for critical user journeys including authentication, shopping cart management, and order processing.

## 🧰 Project Structure
```
cypress/
├── e2e/
│   └── features/            # Feature-based test files
│       ├── baseTest_spec.cy.js  # Base test class with dependency injection
│       └── orders/         # Order-related test specs
├── fixtures/               # Test data
│   ├── users.json         # User credentials
│   └── address.json       # Shipping addresses
├── page_objects/          # Page Object Models
│   ├── BasePage.js        # Base page with common functionality
│   ├── common/            # Shared components
│   └── pages/            # Page-specific objects
├── reports/              # Test execution reports
│   └── html/            # HTML test reports
│       ├── index.html   # Main report file
│       ├── videos/      # Test execution recordings
│       └── screenshots/ # Test failure screenshots
└── support/             # Support files and configurations
    ├── commands.js      # Custom Cypress commands
    ├── Constants.js     # Application constants and page types
    ├── PageObjectFactory.js  # Factory for creating page objects
    └── e2e.js          # E2E test configuration
```

## 🧑‍💻 Test Framework Features
- Page Object Model Implementation
- Base Page Pattern
- Custom Commands
- Fixtures for Test Data
- ESLint Integration
- Step Definitions for Better Readability

## 👩‍🏫 Onboarding Guide for New Testers
1. Install Node.js and npm
2. Clone the repository
3. Run `npm install`
4. Study the `baseTest_spec.cy.js` for architecture understanding
5. Review `orderCreation_spec.cy.js` as a reference implementation
6. Follow the dependency injection pattern for new tests
7. Use provided custom commands and step definitions

## ⚙️ Project Setup
Once you have the Juice Shop application running:
```bash
# Install dependencies
npm install
```

## 🧩 Environment Configuration
### Prerequisites
- Node.js[https://nodejs.org/en] and npm installed
- OWASP Juice Shop application running locally
  - Repository: https://github.com/juice-shop/juice-shop
  - The application must be running on http://localhost:3000
  - Follow the setup instructions in the Juice Shop repository

### Setting up OWASP Juice Shop
```bash
# Clone the Juice Shop repository
git clone https://github.com/juice-shop/juice-shop.git

# Navigate to juice-shop directory
cd juice-shop

# Install dependencies
npm install

# Start the application
PORT=3000 npm start
```
The application should now be running on http://localhost:3000 
- Base URL: http://localhost:3000 (configured in cypress.config.js)
Refer the Juice Shop repository for any issue in starting the app

## 🧪 Test Execution
```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests headlessly
npm run test

# Run specific test spec
npm run test:spec "cypress/e2e/features/orders/orderCreation_spec.cy.js"

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

## 🧠 Test Data and Tagging Convention
### Data Management
- Test data is maintained in fixtures:
  - users.json: Login credentials
  - address.json: Shipping address details

### Step Definition
Tests use descriptive step definitions with cy.step():
```javascript
cy.step('Login: Authenticate as admin user')
cy.step('Cart: Add new items to basket')
cy.step('Checkout: Complete order process')
```

## 🚦 Reporting

### Cypress Test Runner vs Mochawesome Reporter

#### Cypress Test Runner
The Cypress Test Runner (`npm run cypress:open`) provides:
- Interactive test development environment
- Real-time test execution and debugging
- Time-travel debugging with command log
- Network request monitoring
- Live reload on test file changes
- Element selector playground
- Viewport size controls
- Interactive snapshot timeline

To use the Test Runner:
```bash
npm run cypress:open
```

#### Mochawesome Reporter
The Mochawesome Reporter (`npm run test`) provides:
- Static HTML reports for CI/CD pipelines
- Test execution statistics and charts
- Organized test suite hierarchy
- Screenshots of failed tests
- Video recordings of test runs
- Shareable HTML reports
- Step-by-step breakdown with custom logging

Key Differences:
- Test Runner is for development and debugging
- Mochawesome is for CI/CD and documentation
- Test Runner provides real-time interaction
- Mochawesome generates static reports
- Test Runner requires UI access
- Mochawesome works in headless environments

### Setup Mochawesome Reporter
```bash
# Install the reporter
npm install --save-dev cypress-mochawesome-reporter
```

### Configuration
The project uses cypress-mochawesome-reporter for detailed HTML reports with the following features:
- Interactive charts and graphs
- Screenshots on test failures
- Video recordings of test runs
- Step-by-step test execution details
- Embedded assets

### View Test Reports
After running tests, reports are generated in multiple formats:
```bash
# Run tests and generate reports
npm run test

# View HTML Report (MacOS)
open cypress/reports/html/index.html

# View HTML Report (Windows)
start cypress/reports/html/index.html

# View HTML Report (Linux)
xdg-open cypress/reports/html/index.html
```

### Report Locations
- HTML Reports: `cypress/reports/html/index.html`
- Videos: `cypress/reports/html/videos/`
- Screenshots: `cypress/reports/html/screenshots/` (generated on test failures)

### Report Features
- Test Execution Timeline
- Step-by-step Breakdown
- Charts & Statistics
- Failed Test Screenshots
- Test Run Videos
- Custom Step Logging (using cy.step())

## 🪪 Contributing Guidelines
1. Follow the established Page Object Model pattern & the established dependency injection pattern with BaseTest
2. Extend BasePage.js for new page objects
3. Declare required page objects explicitly in test constructors
4. Use cy.step() for test step documentation
5. Maintain test data in fixtures
6. Run ESLint before committing changes
7. Remove unused code and methods to maintain clean architecture

## 🔄 Git Workflow
1. The repository enforces code quality through pre-push hooks
2. Before pushing to remote, ESLint will automatically run
3. If any ESLint errors are found, the push will be blocked
4. Fix all linting errors using `npm run lint:fix` before retrying
5. Only error-free code can be pushed to remote branches

To temporarily bypass the lint check in exceptional cases (not recommended):
```bash
git push --no-verify
```

## 📝 License & Ownership
- Author: Praseeda
- License: ISC
- Copyright © 2025
