import { type Page, type Locator } from '@playwright/test'
import { LayoutComponent } from '@components/LayoutComponent'
import { ROUTES } from '@helpers/routes'

export class CategoryPage {
  readonly layout: LayoutComponent
  readonly heading: Locator
  readonly backLink: Locator
  readonly notesList: Locator

  constructor(private readonly page: Page) {
    this.layout = new LayoutComponent(page)
    this.heading = page.getByRole('heading', { level: 1 })
    this.backLink = page.getByRole('link', { name: '← Back' })
    this.notesList = page.getByRole('list')
  }

  async goto(slug: string) {
    await this.page.goto(ROUTES.category(slug))
  }

  noteCard(name: string): Locator {
    return this.notesList.getByRole('link', { name })
  }
}
