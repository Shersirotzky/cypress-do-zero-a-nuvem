


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
    
    cy.get('.success')//resultado esperado// 
      .should('not.be.visible') //resultado esperado//
      .invoke('show')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
  });
  it('Verifica se os campos são obrigatórios', () => { //verifica se os campos são obrigatórios//
    cy.get('#firstName').type('sher'); 
    cy.get('.button').click(); 

    cy.get('.error').should('be.visible'); //resultado esperado//
    
  });

  it('campo telefone continua vazio', () => {
    cy.clock();
    cy.get('#phone')
      .type('testes')
      .should('have.value', '');
    cy.get('.button').click();
    cy.get('.error').should('be.visible')
    cy.tick(3000);
    cy.get('.error')
      .should('not.be.visible') //resultado esperado//
      .invoke('show')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide') //resultado esperado//
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
   it('envia um arquivo', () => { //envia um arquivo para o campo de upload//
    
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


  it('Exibe e ocula mensangem de erro e sucesso', () => {
    const longText = Cypress._.repeat('testes', 100);//(lowasdash) cria um texto longo para o campo de texto//
   
    const data = {
      firstName: 'Sher',
      lastName: 'Dias',
      email: 'sherdias@test.com.br',
      phone: '11999999999',
      product: 'Blog',  
      text:'testes',
    }
       
    cy.preencheOscamposObrirgatorios(data); //(lowasdash) chama a função criada no arquivo commands.js//
    
    cy.get('.success')
      .should('not.be.visible') 
      .invoke('show')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible') 
      .invoke('show')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide') 

  });

  it('preenche o campo da area de texto com  o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer');
  });
  
  it('faz uma requisisção http', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('eq', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('eq', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  });
  it('Encontre o gato', () => { //encontra o gato na página//
    cy.get('#cat')
      .invoke('show')
      .should('be.visible', 'cat')

    
  });

});
