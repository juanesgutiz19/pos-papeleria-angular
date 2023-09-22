Feature: crearproducto.feature
  Scenario: Creando producto
    Given Ingreso al formulario de crear producto
    When Diligencio el formulario
    Then El producto se guarda exitosamente