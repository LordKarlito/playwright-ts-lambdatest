// Api testing using a publicly available Monster Hunter Api
// https:mhw-db.com

import { expect, test } from '@playwright/test';

test('Get all monsters', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/monsters`);
    expect(response.ok()).toBeTruthy();
});

test('Get a specific monster', async ({ request, baseURL }) => {
    const id = 57;
    const name = 'Rajang';
    const species = 'fanged beast';
    const elements = [ 'thunder' ];
    const response = await request.get(`${baseURL}/monsters/${id}`)
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody['id']).toBe(57);
    expect(responseBody['name']).toBe(name);
    expect(responseBody['species']).toBe(species);
    expect(responseBody['elements']).toMatchObject(elements);
});

test('Get all monsters and find a monster through it', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/monsters`);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    const filteredResponse = responseBody.find(item => item.name === 'Rathalos');

    expect(response.ok()).toBeTruthy();
    expect(filteredResponse.id).toBe(42);
    expect(filteredResponse.name).toBe('Rathalos');
});

test('Get all monster and filter a specified monster species', async ({ request, baseURL}) => {
    const response = await request.get(`${baseURL}/monsters`);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    // Get all items where species = brute wyvern
    const filteredResponse = responseBody.filter(item => item.species == 'brute wyvern');
    console.log(filteredResponse);
    let monsterNames: string[] = [];
    filteredResponse.forEach(element => {
        monsterNames.push(element['name']);
    });

    expect(monsterNames).toEqual(expect.arrayContaining(['Barroth', 'Anjanath']))
});
