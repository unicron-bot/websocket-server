/**
 * 
 * @param {import('../classes/Server')} server 
 * @param {SocketIO.Socket} socket 
 */
function client(server, socket) {
    server.logger.info(`[${socket.id}] connection establised!`, 'Client');
    socket.emit('ready');
    socket.on('ping', () => {
        socket.emit('pong');
        server.logger.debug(`${socket.id} pinged!`, 'Client');
    });
}
module.exports = client;