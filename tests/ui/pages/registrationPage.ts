import { type Page, type Locator } from "playwright/test";

export default class RegisterPage{
    readonly page: Page;
    readonly firtnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly continueRegisterBtn: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.firtnameInput = page.locator('#input-firstname');
        this.lastnameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.phoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.confirmPasswordInput = page.locator('#input-confirm');


    }

    async enterFirstName(firstname: string){
        await this.firtnameInput.fill(firstname);
    }

    async enterLastName(lastname: string){
        await this.lastnameInput.fill(lastname)
    }
    async enterEmail(email: string){
        await this.emailInput.fill(email)
    }
    async enterTelephone(phone: string){
        await this.phoneInput.fill(phone)
    }

    async enterPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async enterConfirmPassword(password: string){
        await this.confirmPasswordInput.fill(password)
    }

    async isSubscribeChecked(){
        const test = await this.page.getByText('No', { exact: true }).isChecked();
        return !test;
    }

    async clickTermsAndConditions(){
        await this.page.getByText('I have read and agree to the Privacy Policy').click();
    }
    async clickContinueToRegister(){
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

}