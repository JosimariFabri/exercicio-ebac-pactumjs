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

it('API - deve adicionar produto com sucesso', async () => {
    await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "New Running Jecket",
            "price": 80,
            "quantity": 100,
            "categories":  [
                  {
                    "_id": "668d683ab9a638eebe8ae2d3",
                    "name": "Clothes"
                  }
                ],
            "description": "<p>Slim fit.</p>",
            "photos": false,
            "popular": false,
            "visible": true,
            "location": "Belo Horizonte, MG, Brasil",
            "additionalDetails": [],
            "specialPrice": 65
          })
          .expectStatus(200)
});

it('API - deve editar produto com sucesso', async () => {
    await spec()
        .put('/api/editProduct/669044021f1b46a35a79c2f4')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "New Running Jecket 2",
            "price": 80,
            "quantity": 150,
            "categories":  [
                  {
                    "_id": "669037171f1b46a35a79c24b",
                    "name": "Clothes"
                  }
                ],
            "description": "<p>Slim fit.</p>",
            "photos": false,
            "popular": false,
            "visible": true,
            "location": "Belo Horizonte, MG, Brasil",
            "additionalDetails": [],
            "specialPrice": 65
          })
          .expectStatus(200)
});

it('API - deve deletar produto com sucesso', async () => {
    await spec()
        .delete('/api/deleteProduct/669044021f1b46a35a79c2f4')
        .withHeaders("Authorization", token)
        .expectStatus(200)
}); 
