const Manager = require('../classes/Manager');
const Guild = require('../classes/Guild');

class GuildManager extends Manager {
    constructor(server) {
        super(server);
        /**
         * @type {Map<string, Guild>}
         */
        this.cache = new Map();
        this.server.db.Guild.find({}, (err, docs) => {
            if (err) {
                this.server.logger.error(err, 'Server');
                process.exit(1);
            }
            docs.forEach((doc) => {
                this.cache.set(doc.guild_id, new Guild(this.server, doc.guild_id, doc));
            });
        });
    }
    /**
     * 
     * @param {string} id
     * @param {boolean} [cache=false]
     * @param {boolean} [force=false]
     */
    async fetch(id, cache = false, force = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.cache.has(id)) return this.cache.get(id);
                const guild = new Guild(this.server, id);
                const data = await guild.fetch(force);
                if (!data) return resolve(null);
                if (cache) this.cache.set(id, data);
                resolve(data);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = GuildManager;