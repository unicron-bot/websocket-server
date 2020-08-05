require('dotenv').config();
const Server = require('./classes/Server');
const server = new Server();

(async function() {
    await server.listen(process.env.PORT || 4201);
})();