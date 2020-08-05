const Route = require('../classes/Route');

class Tag extends Route {
    constructor(server) {
        super(server, '/api/tag');
    }
    createRoute() {
        this.router.get('/:guild_id/:name', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const name = req.params.name;
                const tag = await this.server.managers.tag(guild_id, name).catch((e) => { throw e; });
                res.status(200).send(tag.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/:guild_id/:name', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const name = req.params.name;
                const data = req.body;
                if (!data || typeof data !== 'object') throw { status: 400, message: 'Invalid Body' };
                const tag = await this.server.managers.tag(guild_id, name, true).catch((e) => { throw e; });
                await tag.update(data).catch((e) => { throw e; });
                await tag.fetch().catch((e) => { throw e; });
                this.server.ws.local.emit('raw', 'tagUpdate', tag.toJSON());
                res.status(200).send(tag.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:guild_id/:name', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const name = req.params.name;
                const tag = await this.server.managers.tag(guild_id, name).catch((e) => { throw e; });
                if (tag.raw) await tag.destroy().catch((e) => { throw e; });
                this.server.ws.local.emit('raw', 'tagDelete', { guild_id, name });
                res.status(200).send('Tag Deleted from the Database!');
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}

module.exports = Tag;