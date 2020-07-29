const AuthGen = require('../utils/AuthGen');
/**
 * 
 * @param {SocketIO.Socket} socket 
 * @param {function()} next 
 */
function WebSocket(socket, next) {
    const [client_id, password] = AuthGen.resolve(socket.handshake.query.token);
    next();
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {function()} next 
 */
function API(req, res, next) {
    const [client_id, password] = AuthGen.resolve(req.headers.Authorization);
    next();
}

module.exports = {
    WebSocket,
    API,
}