

Cypress.Commands.add('preencheOscamposObrirgatorios', (data) => {
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#email').type(data.email);
    cy.get('#phone').type(data.phone);
    cy.get('#product').select('Blog');
    cy.get('#open-text-area').type(data.text);
    cy.get('#phone-checkbox').click();
    cy.get('input[type="radio"][value="feedback"]')
         .check()
         .should('be.checked');
    cy.contains('button', 'Enviar').click();
});


