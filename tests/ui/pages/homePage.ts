import { type Locator, type Page } from "playwright/test";

export default class HomePage{
    readonly page: Page;
    readonly linkToHome: Locator;

    constructor(page: Page){
        this.page = page;
        this.linkToHome = page.getByRole('link', { name: 'Home' });

    }

    async goToHomepage(){
        await this.linkToHome.click();
    }

    async clickOnFirstProduct(){
        await this.page.locator('//div/h4/a').first().click();
    }
}