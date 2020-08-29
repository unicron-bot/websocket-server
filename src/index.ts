import Server from './classes/Server';

const server = new Server();

(async function() {
    await server.listen(4201);
})();