/**
 * Custom Cypress Commands
 * For more comprehensive examples of custom commands please read more here:
 * https://on.cypress.io/custom-commands
 */

/**
 * Custom step command for test reporting and logging
 * @param {string} name - Step description
 * @param {Function} fn - Function to execute for this step
 */
Cypress.Commands.add('step', (name, fn) => {
  Cypress.log({
    name: '🔍',
    message: name,
    consoleProps: () => ({
      step: name,
    }),
  });

  return fn();
});