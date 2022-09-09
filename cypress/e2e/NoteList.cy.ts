describe('NoteList', () => {
  before(() => {
    indexedDB.deleteDatabase('Note')
    cy.visit('/')
  })

  it('add', () => {
    cy.noteAdd()
    cy.titleEdit('test1')
    cy.noteAdd()
    cy.titleEdit('test2')
    cy.noteListItem().should('have.length', 2)
  })

  it('search', () => {
    cy.toggleSearchInput()
    cy.searchList('1')
    cy.noteListItem().should('have.length', 1)
    cy.toggleSearchInput()
    cy.noteListItem().should('have.length', 2)
  })

  it('delete', () => {
    cy.noteDeleteAll()
    cy.noteListItem().should('have.length', 0)
  })
})
