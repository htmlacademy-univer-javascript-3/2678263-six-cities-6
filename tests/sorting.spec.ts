import { test, expect } from '@playwright/test';
import { PlacesSortingPage } from './pages/places-sorting-page';

test('places are sorted by popularity (default order)', async ({ page }) => {
  const sortingPage = new PlacesSortingPage(page);

  await sortingPage.open();

  const initialPrices = await sortingPage.getPrices();

  await sortingPage.selectSort('sorting-option-LOW_TO_HIGH');
  await sortingPage.selectSort('sorting-option-POPULAR');

  const currentPrices = await sortingPage.getPrices();

  expect(currentPrices).toEqual(initialPrices);
});

test('sort by price high to low works correctly', async ({ page }) => {
  const sortingPage = new PlacesSortingPage(page);

  await sortingPage.open();

  await sortingPage.selectSort('sorting-option-HIGH_TO_LOW');

  const prices = await sortingPage.getPrices();
  const sorted = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sorted);
});

test('sort by price low to high works correctly', async ({ page }) => {
  const sortingPage = new PlacesSortingPage(page);

  await sortingPage.open();

  await sortingPage.selectSort('sorting-option-LOW_TO_HIGH');

  const prices = await sortingPage.getPrices();
  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});

test('places are sorted by rating (top rated first)', async ({ page }) => {
  const sortingPage = new PlacesSortingPage(page);

  await sortingPage.open();

  await sortingPage.selectSort('sorting-option-TOP_RATED');

  const ratings = await sortingPage.getRatings();
  const sorted = [...ratings].sort((a, b) => b - a);

  expect(ratings).toEqual(sorted);
});
