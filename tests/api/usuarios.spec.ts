import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test('Consultar todos los usuarios', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/users`);

    expect(response.status()).toBe(200);

    const users = await response.json();

    expect(users.length).toBeGreaterThan(0);

});

test('Consultar usuario por ID', async ({ request }) => {

    const userId = 1;
    
    const response = await request.get(`${BASE_URL}/users/${userId}`);

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(userId);

});

test('Consultar todas las publicaciones', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/posts`);

    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(posts.length).toBeGreaterThan(0);

    expect(Array.isArray(posts)).toBe(true);

});

test('Consultar publicaciones usuario 2', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/posts`, {
        params: {
            userId: 2
        }
    });

    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
        expect(post.userId).toBe(2);
    }

});