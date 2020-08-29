require('dotenv').config();
import Server = require('./classes/Server');
const server = new Server();

(async function() {
    await server.listen(process.env.PORT || 4201);
})();