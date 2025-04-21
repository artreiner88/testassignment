import { Page } from "@playwright/test"

export class FormPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setClientName(name: string) {
        await this.page.getByRole("textbox", { name: "Client Name" }).fill(name);
    }

    // The date should be selected using a date picker and automated accordingly
    async setInvoiceDate(date: string) {
        await this.page.getByRole("textbox", { name: "Invoice Date" }).fill(date);
    }

    // The date should be selected using a date picker and automated accordingly
    async setDueDate(date: string) {
        await this.page.getByRole("textbox", { name: "Due Date" }).fill(date);
    }

    async clickAddLineItem() {
        await this.page.getByRole("button", { name: "Add Item" }).click();
    }

    async addLineItem(description: string, quantity: number, price: number) {
        await this.page.getByRole("textbox", { name: "Description" }).fill(description);
        await this.page.getByRole("textbox", { name: "Quantity" }).fill(quantity.toString());
        await this.page.getByRole("textbox", { name: "Unit Price" }).fill(price.toString());
    }

    async submit() {
        await this.page.getByRole("button", { name: "Create" }).click();
    }

    async getSuccessMessage() {
        return this.page.locator('.success-message');
    }

    async getErrorMessage() {
        return this.page.locator('.error-message');
    }    
}