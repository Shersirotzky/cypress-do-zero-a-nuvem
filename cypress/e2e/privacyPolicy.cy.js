
Cypress._.times(10, () => { //repete o teste 3 vezes//
    it('testa a pagina de politica de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');

        cy.contains('h1', 'Política de Privacidade').should('be.visible'); //resultado esperado//
        cy.contains('p', 'Talking About Testing').should('be.visible'); //resultado esperado//
    });
})
