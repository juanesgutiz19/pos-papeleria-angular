import { page } from '../page/producto-page';

describe('producto.spec.cy.ts', () => {
  it('should visit', () => {

    page.irFormularioCrear();
    page.ingresarCampoId('1');
    page.ingresarCampoProducto('user@email.com');


    cy.intercept('POST', '/api/users*', {
      statusCode: 201,
      body:  {'id':'1','email':'user@email.com','createdAt':'2022-06-02T17:10:31.731Z'},
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('usuario creado');
    });

    page.clickBotonGuardar();

  });
});


