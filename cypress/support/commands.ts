/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      noteMenu(): Chainable<void>
      noteAdd(): Chainable<void>
      noteList(): Chainable<JQuery<HTMLElement>>
      noteListItem(): Chainable<JQuery<HTMLElement>>
      noteDeleteAll(): Chainable<void>
      noteEditTitle(): Chainable<JQuery<HTMLElement>>
      titleEdit(title: string): Chainable<void>
      noteSidebar(): Chainable<JQuery<HTMLElement>>
      noteSidebarBtn(): Chainable<JQuery<HTMLElement>>
      noteSidebarBtnSvg(): Chainable<JQuery<HTMLElement>>
      toggleSearchInput(): Chainable<JQuery<HTMLElement>>
      searchList(keyword: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

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

Cypress.Commands.add('toggleSearchInput', () => {
  cy.get('#noteSearch').click()
})

Cypress.Commands.add('searchList', (keyword) => {
  cy.get('#searchInput').type(keyword)
})

export {}
