import { test, expect } from './fixtures';

test.describe('Checkout - end-to-end purchase', () => {
  test('completes a purchase from start to finish', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Add products
    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.addProductToCartByName('Sauce Labs Fleece Jacket');
    await loggedInPage.expectCartCount(2);

    // 2. Go to the cart
    await loggedInPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);

    // 3. Checkout
    await cartPage.checkout();
    await checkoutPage.fillInfo('Rafael', 'Savietto', '23970-000');

    // 4. Check the math, not just the format:
    //    item total = sum of item prices, and total = item total + tax
    const itemPrices = await checkoutPage.getItemPrices();
    expect(itemPrices).toHaveLength(2);
    const expectedSubtotal = itemPrices.reduce((sum, price) => sum + price, 0);

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(tax).toBeGreaterThan(0);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // 5. Finish and check the confirmation
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('does not continue checkout without the required fields', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.continueButton.click(); // nothing filled in
    const error = page.locator('[data-test="error"]');
    await expect(error).toContainText('First Name is required');
  });
});
