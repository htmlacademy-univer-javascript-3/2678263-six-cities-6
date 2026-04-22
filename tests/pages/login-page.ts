import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.submitButton = page.getByTestId('login-submit');
  }

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  async open() {
    await this.page.goto('http://localhost:5173/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
