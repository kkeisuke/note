describe('NoteSidebar', () => {
  before(() => {
    cy.visit('/')
  })

  it('close', () => {
    cy.noteSidebarBtn().click()

    // アイコン
    cy.noteSidebarBtnSvg().should('have.attr', 'xlink:href').and('match', /right/)

    // サイドバー縮小
    cy.noteSidebar().should('have.class', 'close')
    // cy.noteSidebar().should('have.css', 'width', '36px')

    // メニュー非表示
    cy.noteMenu().should('not.be.visible')

    // リスト非表示
    cy.noteList().should('have.class', 'close')
    cy.noteList().should('have.css', 'display', 'none')
  })

  it('open', () => {
    cy.noteSidebarBtn().click()

    // アイコン
    cy.noteSidebarBtnSvg().should('have.attr', 'xlink:href').and('match', /left/)

    // サイドバー拡大
    cy.noteSidebar().should('not.have.class', 'close')
    // cy.noteSidebar().should('have.css', 'width', '208px')

    // メニュー表示
    cy.noteMenu().should('be.visible')

    // リスト非表示
    cy.noteList().should('not.have.class', 'close')
    cy.noteList().should('have.css', 'display', 'block')
  })
})
