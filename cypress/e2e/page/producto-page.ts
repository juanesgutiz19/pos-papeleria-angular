export const page = {
  irFormularioCrear: () => {
    cy.visit('/');
    cy.get('app-navbar > nav > a:nth-child(2)').click();
    cy.get('#linkCrearProducto').click();
  },
  ingresarCampoId: (id) => {
    cy.get('#idProducto').type(id);
  },
  ingresarCampoProducto: (producto) => {
    cy.get('#descripcionProducto').type(producto);
  },
  clickBotonGuardar: () => {
    cy.get('#botonGuardar').click();
  }

};