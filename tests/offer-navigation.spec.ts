import { test, expect } from '@playwright/test';
import { OfferListPage } from './pages/offer-list-page';

test('user can open offer page', async ({ page }) => {
  const offerList = new OfferListPage(page);

  await offerList.open();

  const href = await offerList.getOfferHref(0);

  await offerList.clickFirstOffer();

  await expect(page).toHaveURL(new RegExp(href));
});
