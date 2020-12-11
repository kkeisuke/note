describe('NoteEdit', () => {
  before(() => {
    cy.visit('/')
  })

  afterEach(() => {
    cy.noteDeleteAll()
  })

  it('edit', () => {
    const title = 'test'
    cy.noteAdd()
    cy.titleEdit(title)
    cy.noteListItem().first().contains(title)
  })

  it('read', () => {
    const title = 'test'
    cy.noteAdd()
    cy.titleEdit(title)
    cy.reload()
    cy.noteEditTitle().should('have.value', title)
  })
})
