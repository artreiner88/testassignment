import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/invoices/form.page';
import { ListPage } from '../pages/invoices/list.page';
import validdata from '../data/validData.json';
import emptyClient from '../data/emptyClientName.json';

test.beforeEach(async ({ page }) => {
    await page.goto("/") 
})

test("create invoice with valid data", async ({ page }) => {
    const createPage = new FormPage(page);
    const listPage = new ListPage(page);

    await createPage.setClientName(validdata.clientName);
    await createPage.setInvoiceDate(validdata.invoiceDate);
    await createPage.setDueDate(validdata.dueDate);
    await createPage.clickAddLineItem();

    for (const item of validdata.items) {
        await createPage.addLineItem(item.description, item.quantity, item.price);
    }

    await createPage.submit();

    // Check the success message is visible
    expect(await createPage.getSuccessMessage()).toBeVisible();

    // Get the created invoice and verify the client name, invoice date and status are correct
    const invoice = (await listPage.getInvoice()).textContent();
    expect(invoice).toContain(validdata.clientName);
    expect(invoice).toContain(validdata.invoiceDate);
    expect(invoice).toContain("Not sent");
})

test("create invoice with empty client name", async ({ page }) => {
    const createPage = new FormPage(page);
    await createPage.setClientName(emptyClient.clientName);
    await createPage.setInvoiceDate(emptyClient.invoiceDate);
    await createPage.setDueDate(emptyClient.dueDate);
    await createPage.clickAddLineItem();

    for (const item of emptyClient.items) {
        await createPage.addLineItem(item.description, item.quantity, item.price);
    }

    await createPage.submit();

    expect(await createPage.getErrorMessage()).toBeVisible();
})
