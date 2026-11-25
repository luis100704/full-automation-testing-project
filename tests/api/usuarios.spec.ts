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


test('Validar respuesta HTTP de un usuario', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    // Comprobar código HTTP
    expect(response.status()).toBe(200);

    // Comprobar que la respuesta es satisfactoria
    expect(response.ok()).toBe(true);

    // Comprobar cabeceras
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');

    // Analizar el cuerpo JSON
    const user = await response.json();

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
});


test('Crear un nuevo usuario', async ({ request }) => {
    const newUser = {
        name: 'Luis',
        username: 'betroy',
        email: 'luis@test.com'
    };

    const response = await request.post(`${BASE_URL}/users`, {
        data: newUser
    });

    // Comprobar código HTTP
    expect(response.status()).toBe(201);

    // Comprobar respuesta satisfactoria
    expect(response.ok()).toBe(true);

    // Obtener respuesta JSON
    const createdUser = await response.json();

    // Validar datos devueltos
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.email).toBe(newUser.email);

    // Comprobar que devuelve un ID
    expect(createdUser.id).toBeTruthy();
});


test('Actualizar usuario mediante PUT', async ({ request }) => {
    const updatedUser = {
        id: 1,
        name: 'Luis Actualizado',
        username: 'betroy',
        email: 'actualizado@test.com'
    };

    const response = await request.put(`${BASE_URL}/users/1`, {
        data: updatedUser
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);

    const user = await response.json();

    expect(user.id).toBe(1);
    expect(user.name).toBe(updatedUser.name);
    expect(user.username).toBe(updatedUser.username);
    expect(user.email).toBe(updatedUser.email);
});


test('Actualizar email mediante PATCH', async ({ request }) => {
    const updatedData = {
        email: 'nuevoemail@test.com'
    };

    const response = await request.patch(`${BASE_URL}/users/1`, {
        data: updatedData
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);

    const user = await response.json();

    expect(user.email).toBe(updatedData.email);
    expect(user.id).toBe(1);
});


test('Eliminar usuario mediante DELETE', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);
});


test('Consultar usuario mediante Path Params', async ({ request }) => {
    const userId = 5;

    const response = await request.get(`${BASE_URL}/users/${userId}`);

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(userId);
});


test('Filtrar publicaciones mediante Query Params', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`, {
        params: {
            userId: 2,
            id: 11
        }
    });

    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(posts.length).toBe(1);
    expect(posts[0].userId).toBe(2);
    expect(posts[0].id).toBe(11);
});


test('Consultar usuario enviando Headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(1);
    expect(response.headers()['content-type']).toContain('application/json');
});
