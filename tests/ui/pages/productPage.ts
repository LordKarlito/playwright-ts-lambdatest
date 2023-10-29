import { type Locator, type Page } from "playwright/test";

export default class ProductPage{
    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly toast: Locator;

    constructor(page: Page){
        this.page = page;
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
        this.toast = page.locator('#notification-box-top')
    }
    
    async addFirstTopProductToCart(){
        await this.addToCartBtn.click();
    }

    // async isToastVisible() {
    //     const toast = this.page.locator('#notification-box-top')
    //     // await toast.waitFor({state: 'visible'});
    //     return toast;
    // }
}