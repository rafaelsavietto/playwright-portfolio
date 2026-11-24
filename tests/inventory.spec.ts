import { test, expect } from './fixtures';

test.describe('Product inventory', () => {
  test('adds and removes a product from the cart', async ({ loggedInPage }) => {
    await loggedInPage.expectLoaded();

    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.expectCartCount(1);

    await loggedInPage.removeProductFromCartByName('Sauce Labs Backpack');
    await loggedInPage.expectCartCount(0);
  });

  test('adds several products to the cart', async ({ loggedInPage }) => {
    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.addProductToCartByName('Sauce Labs Bike Light');
    await loggedInPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');

    await loggedInPage.expectCartCount(3);
  });

  test('sorts products by price (low to high)', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi');
    const prices = await loggedInPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sorts products by price (high to low)', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('hilo');
    const prices = await loggedInPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
