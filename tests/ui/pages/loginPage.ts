import { type Page, type Locator } from "playwright/test";

export default class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
    }

    async login(email: string, password: string) {
        await this.enterEmail(email)
        await this.enterLoginPassword(password)
        await this.clickLoginBtn();
    }
    
    async enterEmail(email: string){
        await this.emailInput.fill(email)
    }

    async enterLoginPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async clickLoginBtn(){
        await this.loginBtn.click();
    }

    // async login(email: string, password: string) {
    //     await this.enterEmail(`${process.env.EMAIL}`)
    //     await this.enterLoginPassword(`${process.env.PASS}`)
    //     await this.clickLoginBtn();
    // }
    
    // async enterEmail(email: string){
    //     await this.page.locator('#input-email').fill(email)
    // }

    // async enterLoginPassword(password: string){
    //     await this.page.locator('#input-password').fill(password);
    // }

    // async clickLoginBtn(){
    //     await this.page.getByRole('button', { name: 'Login' }).click();
    // }
}