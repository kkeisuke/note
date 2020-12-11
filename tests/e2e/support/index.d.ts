declare namespace Cypress {
  interface Chainable {
    noteAdd(): void
    noteListItem(): Chainable<Element>
    noteDeleteAll(): void
    noteEditTitle(): Chainable<Element>
    titleEdit(title: string): void
  }
}
