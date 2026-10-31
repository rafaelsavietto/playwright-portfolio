import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly summaryTotalLabel: Locator;
  readonly summarySubtotalLabel: Locator;
  readonly summaryTaxLabel: Locator;
  readonly summaryItemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
    this.summaryTotalLabel = page.locator('.summary_total_label');
    this.summarySubtotalLabel = page.locator('.summary_subtotal_label');
    this.summaryTaxLabel = page.locator('.summary_tax_label');
    this.summaryItemPrices = page.locator('.cart_item .inventory_item_price');
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText(/thank you for your order/i);
  }

  /** Extracts the dollar amount from labels like "Item total: $79.98". */
  private async readAmount(label: Locator): Promise<number> {
    await expect(label).toBeVisible();
    const text = (await label.textContent()) ?? '';
    const match = text.match(/\$(\d+\.\d{2})/);
    if (!match) throw new Error(`No dollar amount found in "${text}"`);
    return parseFloat(match[1]);
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.summaryItemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async getSubtotal(): Promise<number> {
    return this.readAmount(this.summarySubtotalLabel);
  }

  async getTax(): Promise<number> {
    return this.readAmount(this.summaryTaxLabel);
  }

  async getTotal(): Promise<number> {
    return this.readAmount(this.summaryTotalLabel);
  }
}
