class Tag {
    /**
     * 
     * @param {import('./Server')} server 
     * @param {object} id
     * @param {string} id.guild_id
     * @param {string} id.tag_name
     */
    constructor(server, id) {
        this.server = server;
        this.raw = null;
        this.id = id;
    }
    /**
     * @returns {Promise<Tag>}
     */
    fetch(create = false) {
        return new Promise(async (resolve, reject) => {
            let raw = await this.server.db.models.GuildTag.findOne({ where: this.id }).catch(reject);
            if (create && !raw) raw = await this.server.db.models.GuildTag.create(this.id).catch(reject);
            this.raw = raw ? raw : null;
            resolve(this);
        });
    }
    /**
     * @returns {Promise<void>}
     */
    destroy() {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.GuildTag.destroy({ where: this.id }).catch(reject);
            resolve();
        });
    }
    /**
     * @returns {Promise<Tag>}
     * @param {{}} payload
     */
    update(payload) {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.GuildTag.update(payload, { where: this.id }).catch(reject);
            resolve(this);
        });
    }
    /**
     * @returns {{}}
     */
    toJSON() {
        const { guild_id, tag_name, data } = this.raw.toJSON();
        return guild_id && tag_name ? { guild_id, tag: { name: tag_name, data } } : {};
    }
}

module.exports = Tag;