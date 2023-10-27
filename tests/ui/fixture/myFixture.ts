import { test as baseTest } from "@playwright/test";

type karlo = {
    age: number,
    email: string
}

const myFixtureTest = baseTest.extend<karlo>({
    age: 28,
    email: "some_email@gmail.com"
});

export const test = myFixtureTest;