import { test, expect } from "@playwright/test";

// API Testing using the JSONPlaceholder playground.
// https://jsonplaceholder.typicode.com

test('GET - get all posts', async ({ request, baseURL }) => {
    const requestURL = `${baseURL}/posts`;
    const response = await request.get(requestURL);

    const responseBody = await response.json();
    
    // expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(responseBody.length).toBe(100);
});

test('GET - get a specific post', async ({ request, baseURL }) => {
    const postID = 39;
    const requestURL = `${baseURL}/posts/${postID}`;
    const response = await request.get(requestURL);

    // expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(responseBody['id']).toBe(postID);
});

// Per JSONPlaceholder: resource will not be really updated on the server but will be faked as if.
test('POST - create a post', async ({ request, baseURL }) => {
    const requestURL = `${baseURL}/posts`;
    const response = await request.post(requestURL, {
        data: {
            title: 'test post 1',
            body: 'test post body!'
        }
    });

    expect(response.ok()).toBeTruthy();
});

// Per JSONPlaceholder: resource will not be really updated on the server but will be faked as if.
test('PUT - update a post', async ({ request, baseURL }) => {
    const requestURL = `${baseURL}/posts/1`;
    const response = await request.put(requestURL, {
        data: {
            id: 1,
            title: 'test post update',
            body: 'UPDATED POST BODY!',
            userId: 1,
        }
    });

    expect(response.ok()).toBeTruthy();
});

// Per JSONPlaceholder: resource will not be really updated on the server but will be faked as if.
test('PATCH - update a post partially', async ({ request, baseURL }) => {
    const requestURL = `${baseURL}/posts/1`;
    const response = await request.patch(requestURL, {
        data: {
            title: 'test post update title only',
        }
    });

    expect(response.ok()).toBeTruthy();
});

// Per JSONPlaceholder: resource will not be really updated on the server but will be faked as if.
test('DELETE - delete a post', async ({ request, baseURL }) => {
    const requestURL = `${baseURL}/posts/1`;
    const response = await request.delete(requestURL);

    expect(response.ok()).toBeTruthy();
    
})