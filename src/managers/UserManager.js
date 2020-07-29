const Manager = require('../classes/Manager');
const User = require('../classes/User');

class UserManager extends Manager {
    constructor(server) {
        super(server);
        /**
         * @type {Map<string, User>}
         */
        this.cache = new Map();
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
                const user = new User(this.server, id);
                const data = await user.fetch(force);
                if (!data) return resolve(null);
                if (cache) this.cache.set(id, data);
                resolve(data);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = UserManager;