import { Page } from "@playwright/test"

export class ListPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // GET the newest invoice
    async getInvoice() {
        return this.page.locator(".invoice_list").first();
    }
}