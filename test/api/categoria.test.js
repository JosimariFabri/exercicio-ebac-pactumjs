// test.js
const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
})

it('API - deve listar categoria com sucesso', async () => {
    await spec()
        .get('/public/getCategories')
        .expectStatus(200)
});

it('API - deve adicionar categoria com sucesso', async () => {
    await spec()
        .post('/api/addCategory')
        .withHeaders("Authorization", token)
        .withJson({
            "name": 'Nova'
          })
          .expectStatus(200)
});

it('API - deve editar categoria com sucesso', async () => {
    await spec()
        .put('/api/editCategory/669044021f1b46a35a79c2f4')
        .withHeaders("Authorization", token)
        .withJson({
            "name": 'Nova 2'
          })
          .expectStatus(200)
});

it('API - deve deletar categoria com sucesso', async () => {
    await spec()
        .delete('/api/deleteCategory/669044021f1b46a35a79c2f4')
        .withHeaders("Authorization", token)
        .expectStatus(200)
}); 