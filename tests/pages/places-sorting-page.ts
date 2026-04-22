import { Page, Locator } from '@playwright/test';

export class PlacesSortingPage {
  constructor(private page: Page) {
    this.sortButton = page.locator('[data-testid="sorting-current"]');
    this.optionItems = page.locator('[data-testid^="sorting-option"]');
    this.prices = page.locator('[data-testid="price"]');
    this.ratings = page.locator('[data-testid="rating"]');
  }

  readonly sortButton: Locator;
  readonly optionItems: Locator;
  readonly prices: Locator;
  readonly ratings: Locator;

  async open() {
    await this.page.goto('http://localhost:5173/');
  }

  async selectSort(testId: string) {
    await this.sortButton.click();
    await this.page.getByTestId(testId).click();
  }

  async getPrices(): Promise<number[]> {
    const prices = await this.prices.allTextContents();
    return prices.map((p) => Number(p.replace(/[^\d]/g, '')));
  }

  async getRatings(): Promise<number[]> {
    const ratings = await this.ratings.allTextContents();
    return ratings.map((r) => Number(r));
  }
}
