class User {
    server: import('./Server');
    id: string;
    raw: any;
    /**
     * 
     * @param {import('./Server')} server 
     * @param {string} id
     */
    constructor(server: import('./Server'), id: string) {
        this.server = server;
        this.id = id;
        this.raw = null;
    }
    /**
     * @returns {Promise<User>}
     */
    fetch(): Promise<this> {
        return new Promise(async (resolve, reject) => {
            let raw = await this.server.db.models.User.findOne({ where: { id: this.id } }).catch(reject);
            if (!raw) raw = await this.server.db.models.User.create({ id: this.id }).catch(reject);
            this.raw = raw;
            resolve(this);
        })
    }
    /**
     * @returns {Promise<void>}
     */
    destroy(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.User.destroy({ where: { id: this.id } }).catch(reject);
            resolve();
        });
    }
    /**
     * @returns {Promise<User>}
     * @param {{}} partial
     */
    update(partial: {}): Promise<this> {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.User.update(partial, { where: { id: this.id } }).catch(reject);
            resolve(this);
        });
    }
    /**
     * @returns {{}}
     */
    toJSON(): {} {
        return this.raw ? this.raw.toJSON() : {};
    }
}

module.exports = User;