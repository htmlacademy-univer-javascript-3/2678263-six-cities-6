import { Page, Locator } from '@playwright/test';

export class OfferListPage {
  constructor(private page: Page) {
    this.offerCards = page.locator('[data-testid="offer-item"]');
  }

  readonly offerCards: Locator;

  async open() {
    await this.page.goto('http://localhost:5173/');
  }

  async clickFirstOffer() {
    await this.offerCards.first().click();
  }

  async getOfferHref(index: number): Promise<string> {
    return (await this.offerCards.nth(index).getAttribute('href')) ?? '';
  }
}
