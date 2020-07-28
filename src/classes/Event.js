const Server = require('./Server');
class Event {
    /**
     * 
     * @param {Server} server 
     * @param {string} eventName 
     */
    constructor(server, eventName) {
        this.server = server;
        this.eventName = eventName;
    }
    emit(..._args) { }
}
module.exports = Event;