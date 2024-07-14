const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-front';
  pf.config.projectName = 'Loja EBAC Front';
  pf.config.version = '1.0.1';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start();
});

// global after
after(async () => {
    await mock.stop(4000);
    await reporter.end();
});

handler.addInteractionHandler('Categoria response', () =>{
    return{
        provider: 'lojaebac-api',
        flow: 'categoria',
        request: {
            method: 'GET',
            path: '/public/getCategories',
        },
            response: {
                status: 200,
                body: {
                    "success": true
                }
            }
        } 
})


it('API - deve listar categoria com sucesso', async () => {
    await flow("categoria")
    .useInteraction('Categoria response')
        .get(http://localhost:4000/public/getCategories')
        .expectStatus(200)
  });
