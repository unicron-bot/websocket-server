const Route = require('../classes/Route');

class Tags extends Route {
    constructor(server) {
        super(server, '/api/tags');
    }
    createRoute() {
        this.router.get('/:guild_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                if (!guild_id) throw { status: 400, message: 'Missing Parameters' };
                const tags = await this.server.db.models.GuildTag.findAll({ where: { guild_id } }).catch((e) => { throw e; });
                res.status(200).send(tags.map((t) => {
                    const { tag_name, data } = t.toJSON();
                    return { tag_name, data };
                }));
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:guild_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                if (!guild_id) throw { status: 400, message: 'Missing Parameters'};
                const count = await this.server.db.models.GuildTag.destroy({ where: { guild_id }}).catch((e) => { throw e; });
                this.server.ws.local.emit('raw', 'tagDeletion', guild_id);
                res.status(200).send({ status: 200, message: `Deleted ${count} tag(s) datas from ${guild_id}`});
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}

module.exports = Tags;