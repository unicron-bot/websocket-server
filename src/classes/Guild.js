class Guild {
    /**
     * 
     * @param {import('./Server')} server 
     * @param {string} id
     */
    constructor(server, id) {
        this.server = server;
        this.id = id;
        this.raw = null;
    }
    /**
     * @returns {Promise<Guild>}
     */
    fetch() {
        return new Promise(async (resolve, reject) => {
            let raw = await this.server.db.models.Guild.findOne({ where: { id: this.id } }).catch(reject);
            if (!raw) raw = await this.server.db.models.Guild.create({ id: this.id }).catch(reject);
            this.raw = raw;
            resolve(this);
        });
    }
    /**
     * @returns {Promise<void>}
     */
    destroy() {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.Guild.destroy({ where: { id: this.id } }).catch(reject);
            resolve();
        });
    }
    /**
     * 
     * @returns {Promise<Guild>}
     * @param {{}} partial
     */
    update(partial) {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.Guild.update(partial, { where: { id: this.id } }).catch(reject);
            resolve(this);
        });
    }
    toJSON() {
        return this.raw ? this.raw.toJSON() : {};
    }
}

module.exports = Guild;