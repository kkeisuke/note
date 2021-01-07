declare namespace Cypress {
  interface Chainable {
    noteMenu(): Chainable<Element>
    noteAdd(): void
    noteList(): Chainable<Element>
    noteListItem(): Chainable<Element>
    noteDeleteAll(): void
    noteEditTitle(): Chainable<Element>
    titleEdit(title: string): void
    noteSidebar(): Chainable<Element>
    noteSidebarBtn(): Chainable<Element>
    noteSidebarBtnSvg(): Chainable<Element>
  }
}
