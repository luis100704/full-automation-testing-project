import { test, expect } from '@playwright/test';

test('Consultar usuario por ID', async ({ request }) => {

    // Realizamos una petición GET
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    // Comprobamos el código HTTP
    expect(response.status()).toBe(200);

    // Obtenemos el cuerpo de la respuesta
    const user = await response.json();

    // Comprobamos que el usuario devuelto es el esperado
    expect(user.id).toBe(1);

});

test('Consultar usuario ID 2', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/2'
    );

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(2);

});