const Route = require('../classes/Route');

class Guild extends Route {
    constructor(server) {
        super(server, '/api/guild');
    }
    createRoute() {
        this.router.get('/:id', (req, res) => {
            try {
                const id = req.params.id;
                const guild = await this.server.guilds.fetch(id, true, true);
                res.status(200).send(guild.toJSON());
            } catch (e) {
                res.status(400).json(e);
            }
        });
        this.router.post('/:id', (req, res) => {
            try {
                const id = req.params.id;
                const guild = await this.server.guilds.fetch(id, true, true);
                await guild.update(req.body).catch((e) => { throw e; });
                res.status(200).json(guild.toJSON());
                this.server.ws.emit('guildUpdate', guild.toJSON());
            } catch (e) {
                res.status(400).json(e);
            }
        });
        this.router.delete('/:id', (req, res) => {
            try {
                const id = req.params.id;
                const guild = await this.server.guilds.fetch(id);
                guild.destroy();
                if (this.server.guilds.cache.has(id)) this.server.guilds.cache.delete(id);
                res.status(200).json('done');
                this.server.ws.emit('guildDelete', id);
            } catch (e) {
                res.status(400).json(e);
            }
        });
        return this.router;
    }
}

module.exports = Guild;