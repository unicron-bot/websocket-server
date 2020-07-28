require('dotenv').config();
const Server = require('./classes/Server');
const server = new Server();
server.listen(4201);

