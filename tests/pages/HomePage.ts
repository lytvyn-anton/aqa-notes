import { type Page, type Locator } from '@playwright/test'
import { LayoutComponent } from '@components/LayoutComponent'
import { ROUTES } from '@helpers/routes'

export class HomePage {
  readonly layout: LayoutComponent
  readonly heading: Locator
  readonly categoriesSection: Locator

  constructor(private readonly page: Page) {
    this.layout = new LayoutComponent(page)
    this.heading = page.getByRole('heading', { name: 'Knowledge Base', level: 1 })
    this.categoriesSection = page.getByRole('region', { name: 'Browse by Category' })
  }

  async goto() {
    await this.page.goto(ROUTES.home)
  }

  categoryCard(name: string): Locator {
    return this.categoriesSection.getByRole('link', { name })
  }
}
