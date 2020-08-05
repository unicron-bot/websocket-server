/**
 * 
 * @param {import('../classes/Server')} server 
 * @param {SocketIO.Socket} socket 
 */
function client(server, socket) {
    server.logger.info(`[Client ${socket.id}] connected!`, 'Client');
    socket.emit('raw', 'ready');
    socket.on('disconnect', () => {
        server.logger.info(`[${socket.id}] disconnected`, 'Client');
    });
    socket.on('reconnecting', () => {
        server.logger.info(`[${socket.id}] reconnecting...`, 'Client');
    });
    socket.on('error', (err) => {
        server.logger.error(err, 'Client');
    });
}
module.exports = client;