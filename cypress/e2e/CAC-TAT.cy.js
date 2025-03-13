


describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
     // cy.viewport('iphone-xr'); //muda a resolução da tela para iphone-xr//
    cy.visit('./src/index.html');

  });
   
    
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
      
  })
  
  it('Preenche os campos do formulário', () => {

    const longText = Cypress._.repeat('testes', 100);//(lowasdash) cria um texto longo para o campo de texto//
   
    const data = {
      firstName: 'Sher',
      lastName: 'Dias',
      email: 'sherdias@test.com.br',
      phone: '11999999999',
      product: 'Blog',  
      text:'testes',
    }
    cy.preencheOscamposObrirgatorios(data);//(lowasdash) chama a função criada no arquivo commands.js//
    
    cy.get('.success').should('be.visible'); //resultado esperado// 

  });
  it('Verifica se os campos são obrigatórios', () => { //verifica se os campos são obrigatórios//
    cy.get('#firstName').type('sher'); 
    cy.get('.button').click(); 

    cy.get('.error').should('be.visible'); //resultado esperado//
    
  });

  it('campo telefone continua vazio', () => {
    cy.get('#phone')
      .type('testes')
      .should('have.value', '');
    cy.get('.button').click();
   
    cy.get('.error').should('be.visible'); //resultado esperado//
  });

  it('campo telefone é obrigatorio mas não é preenchido', () => { //campo telefone é obrigatório mas não é preenchido//
    cy.get('#firstName').type('Sher');
    cy.get('#lastName').type('Dias');
    cy.get('#email').type('sherdias1@gmail.com');
    cy.get('#phone-checkbox').check();
    cy.get('#product').select('Blog');
    cy.get('#open-text-area').type('testes');
    cy.get('.button').click();

    cy.get('.error').should('be.visible'); //resultado esperado//
  });

  it('marca ambos os checkbox e depois desmarca', () => { 
    cy.get('#phone-checkbox').click()
         .should('be.checked');
    cy.get('#phone-checkbox').uncheck()
        .should('not.be.checked');
  });
   it.only('envia um arquivo', () => { //envia um arquivo para o campo de upload//
    
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json');
    });

  });

    

  it('verifica a politica de privacidade e abre em outra aba', () => { //verifica a politica de privacidade e abre em outra aba//
    
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'href', 'privacy.html');

  });

  it('acessa a pagina de politica de privacidade removendo o target', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click();
      
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible');
    
  });
    

});
