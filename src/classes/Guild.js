class Guild {
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
        let raw = await this.server.db.Guild.findOne({ guild_id: this.id });
        if (create && !raw) raw = await this.server.db.Guild.create({ guild_id: this.id });
        this.raw = raw;
        return this;
    }
    destroy() {
        this.server.db.Guild.deleteOne({ guild_id: this.id }, (err) => {
            if (err) throw err;
        });
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
                if (typeof this.raw.save !== 'function') throw new Error('save has been ajadjaslk');
                await this.raw.save().catch((e) => { throw e });
                resolve({ status: 200 });
            } catch (e) {
                reject(e);
            }
        });
    }
    get toJSON() { 
        return this.raw.toJSON();
    }
}

module.exports = Guild;