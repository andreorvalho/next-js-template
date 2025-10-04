describe('User Registration and Login', () => {
  before(() => {
    // Reset the test database before running the tests
    cy.task('resetTestDatabase');
  });

  it('should register a new user and login', () => {
    // Visit the main page
    cy.visit('/');

    // Click on the registration link
    cy.contains('Register').click();

    // Fill in the registration form
    cy.get('input[id="name"]').type('Jane Doe');
    cy.get('input[id="email"]').type('jane.doe@example.com');
    cy.get('input[id="password"]').type('Password123!');

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Check if the user is redirected to the login page with a success message
    cy.url().should('include', '/login?success=1');
    cy.contains('Registration successful! Please log in.').should('be.visible');

    // Fill in the login form
    cy.get('input[id="email"]').type('jane.doe@example.com');
    cy.get('input[id="password"]').type('Password123!');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Check if the user is redirected to the home page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Check if the user's name is displayed on the home page
    cy.contains('Welcome, Jane Doe').should('be.visible');
  });
});
