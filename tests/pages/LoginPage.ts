import { type Page, type Locator } from '@playwright/test'
import { ROUTES } from '@helpers/routes'

export class LoginPage {
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly errorMessage: Locator
    readonly signingInButton: Locator
    readonly signingUpButton: Locator
    readonly continueAsGuestButton: Locator

    constructor(private readonly page: Page) {
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.signingInButton = page.getByRole('button', { name: 'Sign in' })
        this.errorMessage = page.getByText('Invalid email or password.')
        this.signingUpButton = page.getByRole('button', { name: 'Sign up' })
        this.continueAsGuestButton = page.getByRole('button', { name: 'Continue' })
    }

    async goto() {
        await this.page.goto(ROUTES.login)
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.signingInButton.click()
    }
}
