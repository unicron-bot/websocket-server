class GuildMember {
    /**
     * 
     * @param {import('./Server')} server 
     * @param {object} id
     * @param {string} id.member_id
     * @param {string} id.guild_id
     */
    constructor(server, id) {
        this.server = server;
        this.raw = null;
        this.id = id;
    }
    /**
     * @returns {Promise<GuildMember>}
     */
    fetch() {
        return new Promise(async (resolve, reject) => {
            let raw = await this.server.db.models.GuildMember.findOne({ where: this.id }).catch(reject);
            if (!raw) raw = await this.server.db.models.GuildMember.create(this.id).catch(reject);
            this.raw = raw;
            resolve(this);
        })
    }
    /**
     * @returns {Promise<void>}
     */
    destroy() {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.GuildMember.destroy({ where: this.id }).catch(reject);
            resolve();
        });
    }
    /**
     * @returns {Promise<GuildMember>}
     * @param {{}} payload
     */
    update(payload) {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.GuildMember.update(payload, { where: this.id }).catch(reject);
            resolve(this);
        });
    }
    /**
     * @returns {{}}
     */
    toJSON() {
        const { guild_id, member_id, data } = this.raw.toJSON();
        return guild_id && member_id ? { guild_id, member: { id: member_id, data } } : {};
    }
}

module.exports = GuildMember;