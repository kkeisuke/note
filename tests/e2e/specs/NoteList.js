describe('NoteList', () => {
  before(() => {
    cy.visit('/')
  })

  it('add', () => {
    cy.noteAdd()
    cy.titleEdit('test1')
    cy.noteAdd()
    cy.titleEdit('test2')
    cy.noteListItem().should('have.length', 2)
  })

  it('delete', () => {
    cy.noteDeleteAll()
    cy.noteListItem().should('have.length', 0)
  })
})
