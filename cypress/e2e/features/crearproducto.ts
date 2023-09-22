import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { page } from '../page/producto-page';


Given('Ingreso al formulario de crear producto',()=>{
  page.irFormularioCrear();
});

When('Diligencio el formulario', () => {
  page.irFormularioCrear();
  page.ingresarCampoId('1');
  page.ingresarCampoProducto('user@email.com');
});

Then('El producto se guarda exitosamente', () => {
  cy.intercept('POST', '/api/users*', {
    statusCode: 201,
    body:  {'id':'1','email':'user@email.com','createdAt':'2022-06-02T17:10:31.731Z'},
  });
  
  cy.on('window:alert', (str) => {
    console.log(str);
    expect(str).to.equal('fallo creado');
  });

  page.clickBotonGuardar();

});

