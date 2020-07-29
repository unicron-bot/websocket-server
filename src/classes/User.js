class User {
    /**
     * 
     * @param {import('./Server')} server 
     * @param {string} id
     * @param {import('mongoose').Document} [data=null]
     */
    constructor(server, id, data = null) {
        this.server = server;
        this.id = id;
        this.partial = true;
        if (data) this.partial = false;
        this.raw = data;
    }
    async fetch(create = false) {
        let raw = await this.server.db.User.findOne({ user_id: this.id });
        if (create && !raw) raw = await this.server.db.User.create({ user_id: this.id });
        this.raw = raw;
        return this;
    }
    /**
     * 
     * @param {{}} options
     */
    async update(options) {
        return new Promise(async (resolve, reject) => {
            try {
                const keys = Object.keys(options);
                keys.forEach((key) => {
                    if (this.raw[key]) this.raw[key] = options[key];
                });
                if (typeof this.raw.save !== 'function') throw new Error('oops, save has been changed lellelelele');
                await this.raw.save().catch((e) => { throw e });
                this.server.ws.emit('userUpdate', options);
                resolve(200);
            } catch (e) {
                reject(e);
            }
        });
    }
    get toJSON() { 
        return this.raw.toJSON();
    }
}

module.exports = User;