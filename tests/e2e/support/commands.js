// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('noteMenu', () => {
  cy.get('.NoteMenu')
})

Cypress.Commands.add('noteAdd', () => {
  cy.get('#noteAdd').click()
})

Cypress.Commands.add('noteList', () => {
  return cy.get('.NoteList')
})

Cypress.Commands.add('noteListItem', () => {
  return cy.get('.NoteListItem')
})

Cypress.Commands.add('noteDeleteAll', () => {
  cy.get('.NoteListItem').each(($el) => {
    const item = cy.wrap($el)
    const className = '.NoteListItemDelete'
    item.get(className).first().click({ multiple: true })
    item.get(className).first().click({ multiple: true })
  })
})

Cypress.Commands.add('noteEditTitle', () => {
  return cy.get('.NoteEdit #noteEditTitle')
})

Cypress.Commands.add('titleEdit', (title) => {
  cy.noteEditTitle().clear().type(title).blur()
})

Cypress.Commands.add('noteSidebar', () => {
  return cy.get('.NoteSidebar')
})

Cypress.Commands.add('noteSidebarBtn', () => {
  return cy.get('#noteSidebarBtn')
})

Cypress.Commands.add('noteSidebarBtnSvg', () => {
  return cy.get('#noteSidebarBtn svg use')
})
